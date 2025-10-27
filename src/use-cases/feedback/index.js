const feedbackDb = require("../../data-access/feedbackDb");
const makeAddFeedback = require("./addFeedback");
const makeListFeedback = require("./listFeedback");
const makeShowFeedback = require("./showFeedback");
const makeRemoveFeedback = require("./removeFeedback");
const makeEditFeedback = require("./editFeedback");

const addFeedback = makeAddFeedback({ feedbackDb });
const listFeedback = makeListFeedback({ feedbackDb });
const showFeedback = makeShowFeedback({ feedbackDb });
const removeFeedback = makeRemoveFeedback({ feedbackDb });
const editFeedback = makeEditFeedback({ feedbackDb });

const FeedbackUseCases = Object.freeze({
  addFeedback,
  listFeedback,
  showFeedback,
  removeFeedback,
  feedbackDb,
  editFeedback
});

module.exports = FeedbackUseCases;