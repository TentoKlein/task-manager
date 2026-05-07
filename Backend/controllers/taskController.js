const { Task, User } = require("../models");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      userId: req.user.id
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: {
        userId: req.user.id
      }
    });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// Get Task by ID
exports.getTaskById = async (req, res) => {
  const task = await Task.findByPk(req.params.id, {
    include: User
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};


// Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    await task.update(req.body);

    res.json(task);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    await task.destroy();

    res.json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};