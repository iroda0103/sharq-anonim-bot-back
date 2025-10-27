const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../src/data-access/categoryDb')} deps.categoryDb
 */
module.exports = function makeRemoveCategory({ categoryDb }) {
  return async function removeCategory({ id }) {
    const categoryToDelete = await categoryDb.findById({ id });

    if (!categoryToDelete) {
      throw new NotFoundError("Kategoriya topilmadi.");
    }

    await categoryDb.remove(categoryToDelete);

    return categoryToDelete;
  };
};
