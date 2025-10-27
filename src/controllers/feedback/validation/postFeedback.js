const Joi = require("joi");

exports.postFeedbackSchema = {
  body: Joi.object({
    category: Joi.string().required(),
    user_id: Joi.number().required(),
    message: Joi.string().required(),
    status: Joi.string().default('created'),
    type: Joi.string().required()
  })
};