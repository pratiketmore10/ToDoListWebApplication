// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const tasks = [];

// Your existing GET endpoint to retrieve tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Your existing POST endpoint to add tasks
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    task: req.body.task,
    completed: false, // Add a "completed" property
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// New endpoint to mark a task as complete
app.put('/api/tasks/:id/complete', (req, res) => {
  const taskId = parseInt(req.params.id);

  // Find the task by ID
  const taskToComplete = tasks.find((task) => task.id === taskId);

  if (taskToComplete) {
    // Update the task's "completed" property to true
    taskToComplete.completed = true;
    res.status(200).json(taskToComplete);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
