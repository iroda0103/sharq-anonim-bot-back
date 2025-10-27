/**
 * @param {object} deps
 * @param {import('../../src/data-access/categoryDb')} deps.categoryDb
 */
module.exports = function makeListCategories({ categoryDb }) {
  return async function listCategories({
    filters = {},
    q,
    page = { limit: 10, offset: 0 },
    sort = { by: "id", order: "desc" }
  }) {
    if (filters.role == "all") {
      filters = {};
    }
    const { data, total } = await categoryDb.findAll({
      filters,
      q,
      page,
      sort
    });
    const pageInfo = { total, limit: page.limit, offset: page.offset };
    return { data, pageInfo };
  };
};
