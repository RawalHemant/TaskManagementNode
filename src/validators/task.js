const Joi = require('joi');

const createSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('pending', 'in_progress', 'completed'),
  dueDate: Joi.date().allow(null)
});

const updateSchema = Joi.object({
  title: Joi.string().min(1),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('pending', 'in_progress', 'completed'),
  dueDate: Joi.date().allow(null)
});

exports.validateTaskCreate = (req, res, next) => {
  const { error } = createSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

exports.validateTaskUpdate = (req, res, next) => {
  const { error } = updateSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};