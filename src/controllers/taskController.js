const Task = require('../models/Task');

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const task = await Task.create({ title, description, status, dueDate, userId: req.user._id });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.listTasks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, q } = req.query;
    const filter = { userId: req.user._id, isDeleted: false };
    if (status) filter.status = status;
    if (q) filter.title = { $regex: q, $options: 'i' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Task.countDocuments(filter);
    const tasks = await Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
    res.json({ total, page: parseInt(page), limit: parseInt(limit), tasks });
  } catch (err) {
    next(err);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, isDeleted: false });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (!task.userId.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const updates = req.body;
    const task = await Task.findOne({ _id: req.params.id, isDeleted: false });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (!task.userId.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    Object.assign(task, updates);
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, isDeleted: false });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (!task.userId.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    task.isDeleted = true; // soft delete
    await task.save();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};