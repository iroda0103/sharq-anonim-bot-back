const {
  addCategory,
  listCategory,
  showCategory,
  removeCategory,
  editCategory,
} = require("../../use-cases/category");

const makePostCategory = require("./postCategory");
const makeGetCategorys = require("./getCategorys");
const makeGetCategory = require("./getCategory");
const makeDeleteCategory = require("./deleteCategory");
const makeEditCategory = require("./patchCategory");

const postCategory = makePostCategory({ addCategory });
const getCategorys = makeGetCategorys({ listCategory });
const getCategory = makeGetCategory({ showCategory });
const deleteCategory = makeDeleteCategory({ removeCategory });
const patchCategory = makeEditCategory({ editCategory });

const categorysController = Object.freeze({
  postCategory,
  getCategorys,
  getCategory,
  deleteCategory,
  patchCategory,
});

module.exports = categorysController;
