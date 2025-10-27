const categoryDb = require("../../data-access/categoryDb");
const makeAddCategory = require("./addCategory");
const makeListCategory = require("./listCategory");
const makeShowCategory = require("./showCategory");
const makeRemoveCategory = require("./removeCategory");
const makeEditCategory = require("./editCategory");

const addCategory = makeAddCategory({ categoryDb });
const listCategory = makeListCategory({ categoryDb });
const showCategory = makeShowCategory({ categoryDb });
const removeCategory = makeRemoveCategory({ categoryDb });
const editCategory = makeEditCategory({ categoryDb });

const categoryUseCases = Object.freeze({
  addCategory,
  listCategory,
  showCategory,
  removeCategory,
  categoryDb,
  editCategory
});

module.exports = categoryUseCases;