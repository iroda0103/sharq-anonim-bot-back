const Joi = require("joi");

exports.deleteCategorySchema = {
  params: Joi.object({
    id: Joi.string().trim()
  })
};
