/**
 * @param {object} deps
 * @param {import('../../data-access/feedbackDb')} deps.feedbackDb
 */
module.exports = function makeListFeedbacks({ feedbackDb }) {
  return async function listFeedbacks({
    filters = {},
    q,
    page = { limit: 10, offset: 0 },
    sort = { by: "id", order: "desc" }
  }) {
    // Agar filters.status = "all" bo'lsa, uni olib tashlaymiz
    if (filters.status === "all") {
      const { status, ...rest } = filters;
      filters = rest;
    }

    const { data, total } = await feedbackDb.findAll({
      filters,
      q,
      page,
      sort
    });

    const pageInfo = { total, limit: page.limit, offset: page.offset };

    return { data, pageInfo };
  };
};
