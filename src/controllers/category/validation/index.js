const { postCategorySchema } = require("./postCategory");
const { getCategorysSchema } = require("./getCategorys");
const { getCategorySchema } = require("./getCategory");
const { deleteCategorySchema } = require("./deleteCategory");
const { patchCategorySchema } = require("./patchCategory");

module.exports = {
  postCategorySchema,
  getCategorysSchema,
  getCategorySchema,
  deleteCategorySchema,
  patchCategorySchema,
};
