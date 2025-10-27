const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/EquipmentsDb')} deps.EquipmentsDb
 */
module.exports = function makeRemoveEquipment({ equipmentDb }) {
  return async function removeEquipment({ id }) {
    const EquipmentToDelete = await equipmentDb.findById({ id });

    if (!EquipmentToDelete) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }

    await equipmentDb.remove(EquipmentToDelete);

    return EquipmentToDelete;
  };
};
