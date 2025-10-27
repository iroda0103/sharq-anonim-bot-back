const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/userDb')} deps.userDb
 */
module.exports = function makeShowUser({ userDb }) {
  return async function showUser(filter) {
    console.log("Filtering user by telegram_id:", filter.id);

    const userInfo = await userDb.findOne({ telegram_id: filter.id });
    // const userInfo = await userDb.findById(filter);

    if (!userInfo) {
      throw new NotFoundError("Foydalanuvchi topilmadi");
    }

    return { data: { ...userInfo, id: userInfo.telegram_id } };
  };
};
