const Joi = require("joi");

exports.getFeedbackSchema = {
  params: Joi.object({
    id: Joi.string().trim()
  })
};

