var express = require('express');
var router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.post('/:userId/tasks', function(req, res, next) {
  if (!req.body.name) return res.status(400).json({ message: "Invalid request." })
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: "Server Error. Retry again" })
    }

    let jsonData = JSON.parse(data);
    
    const user = jsonData.find(user => user.id === req.params.userId)

    if (!user) return res.status(404).json({ message: "User not found." })

    const newTask = { id: uuidv4(), name: req.body.name }

    user.tasks.push(newTask)

    const userIndex = jsonData.findIndex(user => user.id === req.params.userId);

    jsonData[userIndex] = user

    fs.writeFile('./users.json', JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: "Error creating task. Retry again." });
      } else {
        res.status(201).json(newTask);
      }
    });
  });
});

router.get('/:userId/tasks/', function(req, res) {
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let jsonData = JSON.parse(data);

    const user = jsonData.find(user => user.id === req.params.userId)
    if (!user) return res.status(404).json({ message: "User not found." })

    return res.status(200).json({ tasks: user.tasks })
  });
})

router.get('/:userId/tasks/:taskId', function(req, res) {
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: "Server Error. Retry again" })
    }

    let jsonData = JSON.parse(data);

    const user = jsonData.find(user => user.id === req.params.userId)
    if (!user) return res.status(404).json({ message: "User not found." })

    const task = user.tasks.find(task => task.id === req.params.taskId)

    if (!task) return res.status(404).json({ message: "Task not found." })
    return res.status(200).json(task)
  });
})

router.put('/:userId/tasks/:taskId', function(req, res, next) {
  if (!req.body.name) return res.status(400).json({ message: "Invalid request." })
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: "Server Error. Retry again" })
    }

    let jsonData = JSON.parse(data);
    const user = jsonData.find(user => user.id === req.params.userId)
    if (!user) return res.status(404).json({ message: "User not found." })

    const task = user.tasks.find(task => task.id === req.params.taskId)
    if (!task) return res.status(404).json({ message: "Task not found." })
    task.name = req.body.name
    const taskIndex = user.tasks.findIndex(taks => task.id === req.params.taskId);
    user.tasks[taskIndex] = task

    const userIndex = jsonData.findIndex(user => user.id === req.params.userId);
    jsonData[userIndex] = user

    fs.writeFile('./users.json', JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: "Server Error. Retry again." });
      } else {
        res.status(200).json(task);
      }
    });
  });
});

router.delete('/:userId/tasks/:taskId', function(req, res, next) {
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: "Server Error. Retry again" })
    }

    let jsonData = JSON.parse(data);
    const user = jsonData.find(user => user.id === req.params.userId)
    if (!user) return res.status(404).json({ message: "User not found." })

    const task = user.tasks.find(task => task.id === req.params.taskId)
    if (!task) return res.status(404).json({ message: "Task not found." })

    user.tasks = user.tasks.filter(task => task.id === req.params.taskId);

    const userIndex = jsonData.findIndex(user => user.id === req.params.userId);
    jsonData[userIndex] = user

    fs.writeFile('./users.json', JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: "Server Error. Retry again." });
      } else {
        return res.status(200).send();
      }
    });
  });
});

module.exports = router;
