const makeCategory = require("../../entities/category");
const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../src/data-access/categoryDb')} deps.categoryDb
 */
module.exports = function makeEditCategory({ categoryDb }) {
  return async function editCategory({ id, ...changes }) {
    const categoryToEdit = await categoryDb.findById({ id });
    console.log('categoryToEdit', categoryToEdit);

    if (!categoryToEdit) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }

    const category = makeCategory(categoryToEdit);

    const result = await categoryDb.update({
        id: category.getId(),
        name: category.getName(),
        description: category.getDescription(),
        icon: category.getIcon(),
        key: category.getKey(),
      })

    return result;
  };
};
