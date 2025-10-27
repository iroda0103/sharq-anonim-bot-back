const { InvalidPropertyError } = require("../../shared/errors");

module.exports = function buildMakeUser({ Id }) {
  return function makeUser({
    id = Id.makeId(),
    first_name,
    telegram_id,
    language_code,
    username,
    role='student'
  } = {}) {
    if (!telegram_id) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli telegram_id bo'lishi shart."
      );
    }

    if (!language_code) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli language_code bo'lishi shart."
      );
    }

    if (!username) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli username bo'lishi shart."
      );
    }

    if (!username) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli username bo'lishi shart."
      );
    }


    if (!id) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli id bo'lishi shart."
      );
    }

    if (!role) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli rol (role) bo'lishi shart."
      );
    }

    if (!["admin", "student"].includes(role)) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli role bo'lishi kk"
      );
    }

    if (!first_name) {
      throw new InvalidPropertyError(
        "Foydalanuvchida yaroqli firts_name bo'lishi shart."
      );
    }

    return Object.freeze({
      getId: () => id,
      getFirstName: () => first_name,
      getTelegramId: () => telegram_id,
      getLanguageCode: () => language_code,
      getUsername: () => username,
      getRole: () => role
    });

  };
};