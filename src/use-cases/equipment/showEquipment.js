const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/equipmentDb')} deps.equipmentDb
 */
module.exports = function makeShowEquipment({ equipmentDb }) {
  return async function showEquipment(filter) {
    console.log({ id: '68f70b6ec16ecbb9d027230c' });
    
    const equipmentInfo = await equipmentDb.findById(filter);

    if (!equipmentInfo) {
      throw new NotFoundError("Foydalanuvchi topilmadi");
    }

    return { data: equipmentInfo };
  };
};
