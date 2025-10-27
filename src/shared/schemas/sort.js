const Joi = require("joi");

exports.buildSortSchema = (sortFields) =>
  Joi.object({
    by: Joi.string()
      .when("order", {
        is: Joi.exist(),
        then: Joi.required()
      })
      .valid(...sortFields),
    order: Joi.string().valid("asc", "desc")
  });
