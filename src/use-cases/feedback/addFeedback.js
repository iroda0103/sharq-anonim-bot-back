const makeFeedback = require("../../entities/feedback");
const { BadRequestError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/feedbackDb')} deps.feedbackDb
 * @param {import('../../adapters/Upload')} deps.Upload
 */
module.exports = function makeAddFeedback({ feedbackDb, Upload }) {
  return async function addFeedback(data) {
    try {
      const feedback = makeFeedback({
        ...data
      });
      console.log('data',data);

      const result = await feedbackDb.insert({
        id: feedback.getId(),
        user_id: feedback.getUserId(),
        message: feedback.getMessage(),
        status: feedback.getStatus(),
        type: feedback.getType(),
        category: feedback.getCategory()
      });
      return result;
    }
    catch (e) {
      throw e
    }
  };
};