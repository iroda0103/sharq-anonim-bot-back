const makeUser = require("../../entities/user");
const { UnauthorizedError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/userDb')} deps.userDb
 * @param {import('../../adapters/Jwt')} deps.Jwt
 */
module.exports = function makeLoginUser({ userDb, Jwt }) {
  return async function loginUser(data) {
    const found = await userDb.findOne({ username: data.username });
    if (!found) {
      throw new UnauthorizedError(
        "Login (username) yoki parol (password) xato."
      );
    }

    const user = makeUser(found);
    const match = user.comparePassword(data.password);

    if (!match) {
      throw new UnauthorizedError(
        "Login (username) yoki parol (password) xato."
      );
    }

    const payload = {
      user: {
        id: user.getId(),
        role: user.getRole()
      }
    };
    const token = Jwt.generateToken(payload);

    return { token, role: user.getRole() };
  };
};
