const mongoose = require("mongoose");
const equipmentDb = require("../../data-access/equipmentDb");
const makeAddEquipment = require("./addEquipment");
const makeListEquipment = require("./listEquipment");
const makeShowEquipment = require("./showEquipment");
const makeRemoveEquipment = require("./removeEquipment");
const makeEditEquipment = require("./editEquipment");
const Upload = require("../../adapters/Upload");
const qrCode = require("../../adapters/qr-code");

const addEquipment = makeAddEquipment({ equipmentDb, Upload ,qrCode,mongoose});
const listEquipment = makeListEquipment({ equipmentDb });
const showEquipment = makeShowEquipment({ equipmentDb });
const removeEquipment = makeRemoveEquipment({ equipmentDb });
const editEquipment = makeEditEquipment({ equipmentDb,qrCode});

const EquipmentUseCases = Object.freeze({
  addEquipment,
  listEquipment,
  showEquipment,
  removeEquipment,
  equipmentDb,
  editEquipment
});

module.exports = EquipmentUseCases;