const makeUser = require("../../entities/user");
const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/userDb')} deps.userDb
 */
module.exports = function makeEditUser({ userDb }) {
  return async function editUser({ id, ...changes }) {
    const userToEdit = await userDb.findById({ id });
    
    if (!userToEdit) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }
    const user = makeUser({ ...userToEdit, ...changes });

    const result = await userDb.update({
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
