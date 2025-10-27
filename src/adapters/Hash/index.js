const bcrypt = require("bcryptjs");

/**
 * @param {string} text
 */
const generate = (text) => {
  return bcrypt.hashSync(text, 10);
};

/**
 * @param {string} plain
 * @param {string} hash
 */
const compare = (plain, hash) => {
  return bcrypt.compareSync(plain, hash);
};

const Hash = Object.freeze({
  generate,
  compare
});

module.exports = Hash;
