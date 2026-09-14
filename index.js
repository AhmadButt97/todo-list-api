const express = require('express');
const { randomUUID } = require('crypto');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// In-memory storage — resets whenever the process restarts.
let tasks = [];

// Health check (handy for confirming the container is actually up)
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Todo API is running' });
});

// Add a task
app.post('/tasks', (req, res) => {
  const { title } = req.body || {};

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'title is required and must be a non-empty string' });
  }

  const task = {
    id: randomUUID(),
    title: title.trim(),
    done: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  res.status(201).json(task);
});

// List all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Mark a task done
app.patch('/tasks/:id/done', (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'task not found' });
  }

  task.done = true;
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`Todo API listening on port ${PORT}`);
});

module.exports = app;
