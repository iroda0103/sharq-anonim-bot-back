const makeUser = require("../../entities/user");
const { BadRequestError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/userDb')} deps.userDb
 */
module.exports = function makeAddUser({ userDb }) {
  return async function addUser(data) {
    const user = makeUser({
      ...data
    });

    const userInfo = await userDb.findOne({ username: user.getUsername() });

    if (userInfo) {
      throw new BadRequestError(
        "Bunday nomli username mavjud boshqa nom tanlang"
      );
    }
      const userInfo2 = await userDb.findOne({ telegram_id: user.getTelegramId() });

    if (userInfo2) {
      throw new BadRequestError(
        "Bunday nomli telegram_id mavjud boshqa nom tanlang"
      );
    }

    const result = await userDb.insert({
      id: user.getId(),
      first_name: user.getFirstName(),
      telegram_id: user.getTelegramId(),
      language_code: user.getLanguageCode(),
      username: user.getUsername(),
      role: user.getRole()
    
    });

    return result;
  };
};
