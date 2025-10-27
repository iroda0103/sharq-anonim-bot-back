const { NotFoundError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/feedbackDb')} deps.feedbackDb
 */
module.exports = function makeRemoveFeedback({ feedbackDb }) {
  return async function removeFeedback({ id }) {
    if (!id) {
      throw new Error("ID berilishi shart");
    }

    const feedbackToDelete = await feedbackDb.findById({ id });

    if (!feedbackToDelete) {
      throw new NotFoundError("Feedback topilmadi.");
    }

    // Universal usul: faqat ID ni uzatish
    await feedbackDb.remove({ id: feedbackToDelete.id });

    // O'chirilgan foydalanuvchi ma'lumotini qaytarish
    return feedbackToDelete;
  };
};