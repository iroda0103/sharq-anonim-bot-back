const makeEquipment = require("../../entities/equipment");
const { BadRequestError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/equipmentDb')} deps.equipmentDb
 * @param {import('../../adapters/Upload')} deps.Upload
 * @param {import('../../adapters/qr-code')} deps.qrCode
 */
module.exports = function makeAddEquipment({ equipmentDb, Upload, qrCode }) {
  return async function addEquipment(data) {
    try {
      console.log("✅ Jihoz kelgan ma'lumot:", data);

      const equipment = makeEquipment({ ...data });

      // Ma'lumotni bazaga yozish
      const result = await equipmentDb.insert({
        name: equipment.getName(),
        model: equipment.getModel(),
        location: equipment.getLocation(),
        responsible_person: equipment.getResponsiblePerson(),
        image: equipment.getImage(),
        images: equipment.getImages(),
        type: equipment.getType(),
        date:equipment.getDate()
      });

      console.log('RESULT', result);

      // QR kod yaratish
      const { qrImage, qrDataUrl } = await qrCode.generateEquipmentQRCode(result._id);
      console.log('MUAMMO ', qrImage, qrDataUrl);

      // QR kodni bazaga yangilash - to'g'ridan-to'g'ri result._id dan foydalaning
      const updated = await equipmentDb.update(result._id, {
        qr_code: qrImage
      });

      console.log("✅ Jihoz muvaffaqiyatli yaratildi:", updated);

      return {
        message: "Jihoz muvaffaqiyatli qo'shildi",
        data: {
          ...updated, // Yangilangan ma'lumotni qaytarish
          qr_link: qrDataUrl,
        },
      };

    } catch (e) {
      console.error("❌ Jihoz yaratishda xatolik:", e.message);

      // Fayllarni tozalash
      if (data.images && data.images.length > 0) {
        for (const filename of data.images) {
          try {
            await Upload.removeTemp("equipment", filename);
          } catch (err) {
            console.warn("⚠️ Faylni o'chirishda xatolik:", err.message);
          }
        }
      }

      throw new BadRequestError(e.message);
    }
  };
};