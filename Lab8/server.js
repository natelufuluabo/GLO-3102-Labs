import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 8080;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

const users = [
  { username: "admin", password: "1234" },
  { username: "user", password: "abcd" }
];

const tokens = {};

function generateToken() {
  return Math.random().toString(36).substring(2);
}

app.get("/", (req, res) => {
  const token = req.cookies.token;
  if (token && tokens[token]) {
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
});

app.get("/signup", (req, res) => {
    res.render("signup");
  });

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = generateToken();
    tokens[token] = username;
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ token });
  } else {
    res.sendStatus(401);
  }
});

app.get("/logout", (req, res) => {
    const token = req.cookies.token;
    if (token) {
      delete tokens[token];
      res.clearCookie("token");
    }
    res.redirect("/login");
  });
  

app.get("/home", (req, res) => {
  const token = req.cookies.token;
  const username = tokens[token];
  if (username) {
    res.render("home", { username });
  } else {
    res.redirect("/login");
  }
});

app.post("/users", (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).send("User already exists");
  }
  users.push({ username, password });
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});