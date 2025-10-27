const express = require("express");
const controllers = require(".");
const expressCb = require("../../adapters/express-callback");

const postFeedback = expressCb(controllers.postFeedback);
const getFeedbacks = expressCb(controllers.getFeedbacks);
const getFeedback = expressCb(controllers.getFeedback);
const deleteFeedback = expressCb(controllers.deleteFeedback);
const patchFeedback = expressCb(controllers.patchFeedback, );
// { checkRoles: ["admin"] }
const router = express.Router();

router.post("/feedback",postFeedback);
router.get("/feedback", getFeedbacks);
router.get("/feedback/:id", getFeedback);
router.patch("/feedback/:id", patchFeedback);
router.delete("/feedback/:id", deleteFeedback);

module.exports = router;
