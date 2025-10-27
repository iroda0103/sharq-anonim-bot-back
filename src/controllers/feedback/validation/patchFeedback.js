const Joi = require("joi");

exports.patchFeedbackSchema = {
  params: Joi.object({
    id: Joi.string().trim()
  }),
  body: Joi.object({
        first_name: Joi.string().trim(),
        last_name: Joi.string().trim(),
        father_name: Joi.string().trim(),
        birth_date: Joi.date().iso(),
        phone: Joi.string().trim(),
        address: Joi.string().trim(),
        status: Joi.string().valid("pending", "created", "rejected", "successfull"),
        passportSeries: Joi.string().trim(),
        passportNumber: Joi.string().trim(),
        passportJsshir: Joi.string().trim(),
        additionalInfo: Joi.string().allow(""),
  })
};
