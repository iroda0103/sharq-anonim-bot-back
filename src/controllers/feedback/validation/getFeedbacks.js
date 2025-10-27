const Joi = require("joi");
const {
  offsetPaginationSchema,
  buildSortSchema
} = require("../../../shared/schemas");

exports.getFeedbacksSchema = {
  query: Joi.object({
    q: Joi.string().allow(""),
    filters: { status: Joi.string().valid("created", "pending", "rejected","successfull") },
    page: offsetPaginationSchema,
    sort: buildSortSchema(['id']),
  })
};
