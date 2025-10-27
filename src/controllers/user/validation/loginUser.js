const Joi = require("joi");

exports.loginUserSchema = {
  body: Joi.object({
    username: Joi.string().trim(),
    password: Joi.string().trim()
  })
};
