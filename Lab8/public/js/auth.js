document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;
  
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
  
    if (response.ok) {
      const data = await response.json();
      Cookies.set("token", data.token);
      window.location.href = "/home";
    } else {
      alert("Login failed!");
    }
  });
  