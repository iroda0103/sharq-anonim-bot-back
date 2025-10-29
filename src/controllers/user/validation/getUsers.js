const Joi = require("joi");
const {
  offsetPaginationSchema,
  buildSortSchema
} = require("../../../shared/schemas");

exports.getUsersSchema = {
  params: Joi.object({
    q: Joi.string().allow(""),
    filters: { role: Joi.string().valid("all", "admin", "employee") },
    page: offsetPaginationSchema,
    sort: buildSortSchema(["id", "age"])
  })
};
