// const { ObjectId } = require("bson");
// const { isValidObjectId } = require("mongoose");

// const Id = Object.freeze({
//   makeId: () => new ObjectId(),
//   isValidId: isValidObjectId
// });

// module.exports = Id;
const { Types } = require("mongoose");

const Id = Object.freeze({
  makeId: () => new Types.ObjectId().toString(), // string formatida qaytaradi
  isValidId: Types.ObjectId.isValid
});

module.exports = Id;

