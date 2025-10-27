const Joi = require("joi");

exports.getCategorySchema = {
  params: Joi.object({
    id: Joi.string().trim()
  })
};

