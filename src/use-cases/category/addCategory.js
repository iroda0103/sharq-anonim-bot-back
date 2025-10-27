const makeCategory = require("../../entities/category");
const { BadRequestError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../src/data-access/categoryDb')} deps.categoryDb
 */
module.exports = function makeAddCategory({ categoryDb }) {
  return async function addCategory(data) {
    try {
      const category = makeCategory({
        ...data,
      });

      const categoryInfo = await categoryDb.findOne({
        key: category.getKey(),
      });

      if (categoryInfo) {
        throw new BadRequestError(
          "Bunday nomli key  mavjud boshqa tanlang"
        );
      }

      const result = await categoryDb.insert({
        id: category.getId(),
        name: category.getName(),
        description: category.getDescription(),
        icon: category.getIcon(),
        key: category.getKey(),
      });
    } catch (e) {
      throw e;
    }
  };
};
