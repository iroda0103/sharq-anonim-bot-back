const Joi = require("joi");

exports.deleteUserSchema = {
  params: Joi.object({
    id: Joi.string().trim()
  })
};
