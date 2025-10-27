const { InvalidPropertyError } = require("../../shared/errors");

module.exports = function buildMakeCategory({ Id }) {
  return function makeCategory({
    id = Id.makeId(),
    name,
    description,
    key,
    icon
  } = {}) {
    if (!name) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli name bo'lishi shart."
      );
    }

    if (!description) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli description bo'lishi shart."
      );
    }

    if (!icon) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli icon bo'lishi shart."
      );
    }
 if (!key) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli key bo'lishi shart."
      );
    }

    return Object.freeze({
      getId: () => id,
      getName: () => name,
      getDescription: () => description,
      getIcon: () => icon,
      getKey: () => key
    });
  };
};