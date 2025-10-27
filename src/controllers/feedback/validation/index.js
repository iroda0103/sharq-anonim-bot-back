const { postFeedbackSchema } = require("./postFeedback");
const { getFeedbacksSchema } = require("./getFeedbacks");
const { getFeedbackSchema } = require("./getFeedback");
const { deleteFeedbackSchema } = require("./deleteFeedback");
const { patchFeedbackSchema } = require("./patchFeedback");

module.exports = {
  postFeedbackSchema,
  getFeedbacksSchema,
  getFeedbackSchema,
  deleteFeedbackSchema,
  patchFeedbackSchema,
};
