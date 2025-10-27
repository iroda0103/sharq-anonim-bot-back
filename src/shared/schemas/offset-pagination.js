const Joi = require("joi");

exports.offsetPaginationSchema = Joi.object({
  limit: Joi.number().integer().min(1),
  offset: Joi.number().integer().min(0).when("limit", {
    is: Joi.exist(),
    then: Joi.required(),
    otherwise: Joi.forbidden()
  })
});
