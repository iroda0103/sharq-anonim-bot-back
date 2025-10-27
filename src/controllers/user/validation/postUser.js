const Joi = require("joi");

exports.postUserSchema = {
  body: Joi.object({
    first_name: Joi.string().trim(),
    telegram_id: Joi.number().required(),
    role: Joi.string().trim(),
    language_code: Joi.string().trim(),
    username: Joi.string().trim(),
  })
};
