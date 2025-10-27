const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../src/data-access/categoryDb')} deps.categoryDb
 */
module.exports = function makeShowCategory({ categoryDb }) {
  return async function showCategory(filter) {
    const categoryInfo = await categoryDb.find(filter);

    if (!categoryInfo) {
      throw new NotFoundError("Kategoriya topilmadi");
    }

    return { data: categoryInfo };
  };
};
