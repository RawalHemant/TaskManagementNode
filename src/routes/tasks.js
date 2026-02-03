const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/taskController');
const { validateTaskCreate, validateTaskUpdate } = require('../validators/task');

router.use(auth);

router.post('/', validateTaskCreate, taskController.createTask);
router.get('/', taskController.listTasks);
router.get('/:id', taskController.getTask);
router.put('/:id', validateTaskUpdate, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
