const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { getFeedbacksSchema } = require("./validation");

module.exports = function makeGetFeedbacks({ listFeedback }) {
  return async function getFeedbacks(httpRequest) {
    try {
      const validator = httpValidator(
        { query: httpRequest.query },
        getFeedbacksSchema
      );
      const { error, query } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const result = await listFeedback({ ...query });

      return {
        headers: {
          "Content-Type": "Feedback/json"
        },
        statusCode: 200,
        body: { ...result }
      };
    } catch (e) {
      console.log(e);

      return {
        headers: {
          "Content-Type": "Feedback/json"
        },
        statusCode: mapErrorToStatus(e),
        body: { message: e.message }
      };
    }
  };
};
