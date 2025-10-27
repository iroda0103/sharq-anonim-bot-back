const makeFeedback = require("../../entities/feedback");
const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/feedbackDb')} deps.feedbackDb
 */

module.exports = function makeEditFeedback({ feedbackDb }) {
  return async function editFeedback({ id, ...changes }) {
    const feedbackToEdit = await feedbackDb.findById({ id });

    if (!feedbackToEdit) {
      throw new NotFoundError("Feedback topilmadi.");
    }

    const feedback = makeFeedback({ ...feedbackToEdit, ...changes });

    const result = await feedbackDb.update({
      id: feedback.getId(),
      user_id: feedback.getUserId(),
      message: feedback.getMessage(),
      status: feedback.getStatus(),
      type: feedback.getType(),
      category: feedback.getCategory()
    });
    return result;
  };
};