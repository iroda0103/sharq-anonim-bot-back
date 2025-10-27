const jwt = require("jsonwebtoken");
const config = require("../../shared/config");

function generateToken(payload) {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: "1h" });
}

function verifyToken(token) {
  return jwt.verify(
    token,
    config.jwt.secret,
    { ignoreExpiration: false },
    (error, decoded) => {
      if (error) {
        return false;
      }
      return decoded;
    }
  );
}

const Jwt = Object.freeze({
  generateToken,
  verifyToken
});

module.exports = Jwt;
