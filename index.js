// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json());

// In-memory storage for tasks
let tasks = [];

// Display a list of all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Display details of a specific task based on its ID
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Add a new task to the collection
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = generateTaskId();
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update the details of a specific task based on its ID
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;

  const index = tasks.findIndex(task => task.id === taskId);

  if (index !== -1) {
    tasks[index] = {
      ...tasks[index],
      ...updatedTask,
    };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Delete a specific task based on its ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  tasks = tasks.filter(task => task.id !== taskId);
  res.json({ message: 'Task deleted successfully' });
});

// Helper function to generate a unique task ID
function generateTaskId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
