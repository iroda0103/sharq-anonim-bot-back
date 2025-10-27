const Joi = require("joi");

exports.postCategorySchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    key: Joi.string().min(3).max(30).required(),
    icon: Joi.string().max(10).optional(),
    description: Joi.string().max(255).optional()
  })
};