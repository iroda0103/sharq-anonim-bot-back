const { postUserSchema } = require("./postUser");
const { getUsersSchema } = require("./getUsers");
const { getUserSchema } = require("./getUser");
const { deleteUserSchema } = require("./deleteUser");
const { loginUserSchema } = require("./loginUser");
const { patchUserSchema } = require("./patchUser");
const { patchMeSchema } = require("./patchMe");

module.exports = {
  postUserSchema,
  getUsersSchema,
  getUserSchema,
  deleteUserSchema,
  loginUserSchema,
  patchUserSchema,
  patchMeSchema
};
