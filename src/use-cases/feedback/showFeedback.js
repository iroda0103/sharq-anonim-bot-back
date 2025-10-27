const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/feedbackDb')} deps.feedbackDb
 */
module.exports = function makeShowFeedback({ feedbackDb }) {
  return async function showFeedback(filter) {
    const feedbackInfo = await feedbackDb.findById(filter);

    if (!feedbackInfo) {
      throw new NotFoundError("Feedback topilmadi");
    }

    return { data: feedbackInfo };
  };
};
