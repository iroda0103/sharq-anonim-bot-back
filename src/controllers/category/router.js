const express = require("express");
const controllers = require(".");
const expressCb = require("../../adapters/express-callback");

const postCategory = expressCb(controllers.postCategory);
const getCategorys = expressCb(controllers.getCategorys);
const getCategory = expressCb(controllers.getCategory);
const deleteCategory = expressCb(controllers.deleteCategory);
const patchCategory = expressCb(controllers.patchCategory, );
const router = express.Router();

router.post("/category",postCategory);
router.get("/category", getCategorys);
router.get("/category/:id", getCategory);
router.patch("/category/:id", patchCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
