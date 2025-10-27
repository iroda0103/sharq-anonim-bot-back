const express = require("express");
const controllers = require("./");
const expressCb = require("../../adapters/express-callback");

const postUser = expressCb(controllers.postUser);
const getUsers = expressCb(controllers.getUsers);
const getUser = expressCb(controllers.getUser);
const deleteUser = expressCb(controllers.deleteUser);
const postLoginUser = expressCb(controllers.postLoginUser);
const getUserMe = expressCb(controllers.getUserMe, { checkLogin: true });
const patchUser = expressCb(controllers.patchUser, { checkRoles: ["admin"] });
const patchMe = expressCb(controllers.patchMe, { checkLogin: true });

const router = express.Router();

router.post("/users", postUser);
router.post("/users/login", postLoginUser);
router.get("/users", getUsers);
router.get("/users/me", getUserMe);
router.get("/users/:id", getUser);
router.patch("/users/me", patchMe);
router.patch("/users/:id", patchUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
