const Joi = require("joi");

exports.deleteFeedbackSchema = {
  params: Joi.object({
    id: Joi.string().trim()
  })
};
