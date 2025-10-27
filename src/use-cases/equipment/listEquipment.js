/**
 * @param {object} deps
 * @param {import('../../data-access/equipmentsDb')} deps.equipmentDb
 */
module.exports = function makeListEquipments({ equipmentDb }) {
  return async function listEquipments({
    filters = {},
    q,
    page = { limit: 10, offset: 0 },
    sort = { by: "id", order: "desc" }
  }) {
    if (filters.role == "all") {
      filters = {};
    }
    const { data, total } = await equipmentDb.findAll({
      filters,
      q,
      page,
      sort
    });
    const pageInfo = { total, limit: page.limit, offset: page.offset };
    return { data, pageInfo };
  };
};
