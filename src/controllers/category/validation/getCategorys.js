const Joi = require("joi");
const {
  offsetPaginationSchema,
  buildSortSchema
} = require("../../../shared/schemas");

exports.getCategorysSchema = {
  params: Joi.object({
    q: Joi.string().allow(""),
    filters: { key: Joi.string().trim() },
    page: offsetPaginationSchema,
    sort: buildSortSchema(['id','key','name','createdAt','updatedAt']),
  })
};
