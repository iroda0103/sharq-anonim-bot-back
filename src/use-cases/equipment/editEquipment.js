const makeEquipment = require("../../entities/equipment");
const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/equipmentDb')} deps.equipmentDb
 */
module.exports = function makeEditEquipment({ equipmentDb }) {
  return async function editEquipment({ id, ...changes }) {
    // Bazadan mavjud qurilmani olish
    const equipmentToEdit = await equipmentDb.findById({ id });

    if (!equipmentToEdit) {
      throw new NotFoundError("Ushbu jihoz topilmadi.");
    }

    // Entity ichida validatsiyalarni ishlatish
    const equipment = makeEquipment({
      ...equipmentToEdit,
      ...changes,
    });

    // Ma’lumotlarni yangilash
    const result = await equipmentDb.updateOne({
      id: equipment.getId(),
      name: equipment.getName(),
      model: equipment.getModel(),
      location: equipment.getLocation(),
      responsible_person: equipment.getResponsiblePerson(),
      // image: equipment.getImage(),
      // images: equipment.getImages(),
      qr_code: equipment.getQrCode(),
      type: equipment.getType(),
      date: equipment.getDate()

    });

    return result;
  };
};
