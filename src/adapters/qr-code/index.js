// const QRCode = require("qrcode");
// const mongoose = require("mongoose");

// /**
//  * Jihoz uchun QR kod yaratadi.
//  * @param {string|ObjectId} equipmentId - Jihozning IDsi
//  * @returns {Promise<{ qrImage: string, qrDataUrl: string }>}
//  */
// async function generateEquipmentQRCode(equipmentId) {
//   try {
//     if (!equipmentId) {
//       throw new Error("Jihoz IDsi kiritilmagan");
//     }

//     let idString;
//     if (mongoose.Types.ObjectId.isValid(equipmentId)) {
//       idString = equipmentId.toString();
//     } else {
//       idString = String(equipmentId);
//     }

//     // Frontenddagi ko‘rish sahifasi URL
//     const baseUrl = process.env.FRONTEND_URL || "http://localhost:8080";
//     const qrDataUrl = `${baseUrl}/equipment/view/${idString}`;

//     // QR kodni base64 formatda yaratish
//     const qrImage = await QRCode.toDataURL(qrDataUrl, {
//       color: {
//         dark: "#000000",
//         light: "#FFFFFF",
//       },
//       width: 300,
//       margin: 1,
//     });

//     return { qrImage, qrDataUrl };
//   } catch (error) {
//     console.error("❌ QR code yaratishda xatolik:", error);
//     throw new Error("QR kod yaratishda xatolik yuz berdi");
//   }
// }

// module.exports = {
//   generateEquipmentQRCode,
// };

const QRCode = require("qrcode");
const mongoose = require("mongoose");

/**
 * Jihoz uchun QR kod yaratadi.
 * @param {string|ObjectId} equipmentId - Jihozning IDsi
 * @returns {Promise<{ qrImage: string, qrDataUrl: string }>}
 */
async function generateEquipmentQRCode(equipmentId) {
  try {
    if (!equipmentId) {
      throw new Error("Jihoz IDsi kiritilmagan");
    }

    let idString;
    
    // MongoDB ObjectId ni tekshirish va string ga o'tkazish
    if (mongoose.Types.ObjectId.isValid(equipmentId)) {
      // Agar ObjectId instance bo'lsa, toString() qilish
      idString = equipmentId.toString ? equipmentId.toString() : String(equipmentId);
    } else {
      idString = String(equipmentId);
    }

    console.log("📝 QR kod uchun ID :", idString);

    // Frontenddagi ko'rish sahifasi URL
    const baseUrl = process.env.FRONTEND_URL || "https://eqpsharq.vercel.app";
    const qrDataUrl = `${baseUrl}/equipment/${idString}`;

    // QR kodni base64 formatda yaratish
    const qrImage = await QRCode.toDataURL(qrDataUrl, {
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
      width: 300,
      margin: 1,
    });

    console.log("✅ QR kod muvaffaqiyatli yaratildi");

    return { qrImage, qrDataUrl };
  } catch (error) {
    console.error("❌ QR code yaratishda xatolik:", error);
    throw new Error("QR kod yaratishda xatolik yuz berdi: " + error.message);
  }
}

module.exports = {
  generateEquipmentQRCode,
};