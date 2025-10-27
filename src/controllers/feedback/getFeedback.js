const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { getFeedbackSchema } = require("./validation");

module.exports = function makeGetFeedback({ showFeedback }) {
  return async function getFeedback(httpRequest) {
    try {
      const validator = httpValidator(
        { params: httpRequest.params },
        getFeedbackSchema
      );
      const { error, params } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const result = await showFeedback({ ...params });

      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 200,
        body: { ...result }
      };
    } catch (e) {
      console.log(e);

      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: mapErrorToStatus(e),
        body: { message: e.message }
      };
    }
  };
};
