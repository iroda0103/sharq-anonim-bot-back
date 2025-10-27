const { InvalidPropertyError } = require("../../shared/errors");

module.exports = function buildMakeFeedback({ Id }) {
  return function makeFeedback({
    id = Id.makeId(),
    user_id,
    message,
    status,
    type,
    category
  } = {}) {
    if (!user_id) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli user_id bo'lishi shart."
      );
    }

    if (!message) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli message bo'lishi shart."
      );
    }

    if (!status) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli status bo'lishi shart."
      );
    }

    if (!type) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli type bo'lishi shart."
      );
    }
    if (!category) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli category bo'lishi shart."
      );
    }

    return Object.freeze({
      getId: () => id,
      getUserId: () => user_id,
      getMessage: () => message,
      getStatus: () => status,
      getType: () => type,
      getCategory: () => category
    });
  };
};