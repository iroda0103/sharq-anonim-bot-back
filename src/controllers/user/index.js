const {
  addUser,
  listUser,
  showUser,
  removeUser,
  loginUser,
  editUser
} = require("../../use-cases/users");

const makePostUser = require("./postUser");
const makeGetUsers = require("./getUsers");
const makeGetUser = require("./getUser");
const makeDeleteUser = require("./deleteUser");
const makeLoginUser = require("./loginUser");
const makeGetUserMe = require("./getUserMe");
const makeEditUser = require("./patchUser");
const makePatchMe = require("./patchMe");

const postUser = makePostUser({ addUser });
const getUsers = makeGetUsers({ listUser });
const getUser = makeGetUser({ showUser });
const getUserMe = makeGetUserMe({ showUser });
const deleteUser = makeDeleteUser({ removeUser });
const postLoginUser = makeLoginUser({ loginUser });
const patchUser = makeEditUser({ editUser });
const patchMe = makePatchMe({ editUser });

const usersController = Object.freeze({
  postUser,
  getUsers,
  getUser,
  deleteUser,
  postLoginUser,
  getUserMe,
  patchUser,
  patchMe
});

module.exports = usersController;
