const Joi = require("joi");

exports.getUserSchema = {
  params: Joi.object({
    id: Joi.string().trim()
  })
};
