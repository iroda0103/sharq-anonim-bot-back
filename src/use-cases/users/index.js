const userDb = require("../../data-access/userDb");
const Jwt = require("../../adapters/Jwt");
const makeAddUser = require("./addUser");
const makeListUser = require("./listUser");
const makeShowUser = require("./showUser");
const makeRemoveUser = require("./removeUser");
const makeLoginUser = require("./loginUser");
const makeEditUser = require("./editUser");

const addUser = makeAddUser({ userDb });
const listUser = makeListUser({ userDb });
const showUser = makeShowUser({ userDb });
const removeUser = makeRemoveUser({ userDb });
const loginUser = makeLoginUser({ userDb, Jwt });
const editUser = makeEditUser({ userDb });

const userUseCases = Object.freeze({
  addUser,
  listUser,
  showUser,
  removeUser,
  userDb,
  loginUser,
  editUser
});

module.exports = userUseCases;