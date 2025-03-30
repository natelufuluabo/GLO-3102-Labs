var express = require('express');
var router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.post('/', function(req, res, next) {
  const newUser = { id: uuidv4(), tasks: [] }
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: "Server Error. Retry again" })
    }

    let jsonData = JSON.parse(data);
    
    jsonData.push(newUser);

    fs.writeFile('./users.json', JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: "Error creating user. Retry again." });
      } else {
        res.status(201).json({ id: newUser.id });
      }
    });
  });
});

module.exports = router;
