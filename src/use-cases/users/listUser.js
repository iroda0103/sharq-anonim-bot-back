/**
 * @param {object} deps
 * @param {import('../../data-access/userDb')} deps.userDb
 */
module.exports = function makeListUsers({ userDb }) {
  return async function listUsers({
    filters = {},
    q,
    page = { limit: 10, offset: 0 },
    sort = { by: "id", order: "desc" }
  }) {
    if (filters.role == "all") {
      filters = {};
    }
    const { data, total } = await userDb.findAll({
      filters,
      q,
      page,
      sort
    });
    const pageInfo = { total, limit: page.limit, offset: page.offset };
    return { data, pageInfo };
  };
};
