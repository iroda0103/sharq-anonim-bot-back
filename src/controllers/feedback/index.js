const {
  addFeedback,
  listFeedback,
  showFeedback,
  removeFeedback,
  editFeedback,
} = require("../../use-cases/feedback");

const makePostFeedback = require("./postFeedback");
const makeGetFeedbacks = require("./getFeedbacks");
const makeGetFeedback = require("./getFeedback");
const makeDeleteFeedback = require("./deleteFeedback");
const makeEditFeedback = require("./patchFeedback");

const postFeedback = makePostFeedback({ addFeedback });
const getFeedbacks = makeGetFeedbacks({ listFeedback });
const getFeedback = makeGetFeedback({ showFeedback });
const deleteFeedback = makeDeleteFeedback({ removeFeedback });
const patchFeedback = makeEditFeedback({ editFeedback });

const feedbacksController = Object.freeze({
  postFeedback,
  getFeedbacks,
  getFeedback,
  deleteFeedback,
  patchFeedback,
});

module.exports = feedbacksController;
