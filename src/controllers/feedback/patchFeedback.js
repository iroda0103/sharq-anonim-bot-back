const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { patchFeedbackSchema } = require("./validation");

module.exports = function makePatchFeedback({ editFeedback }) {
  return async function patchFeedback(httpRequest) {
    try {
      const validator = httpValidator(
        { body: httpRequest.body, params: httpRequest.params },
        patchFeedbackSchema
      );
      const { error, body, params } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const data = await editFeedback({ ...params, ...body });

      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 201,
        body: { data }
      };
    } catch (e) {
      console.log(e);

      return {
        headers: {
          "Content-Type": "Feedback/json"
        },
        statusCode: mapErrorToStatus(e),
        body: {
          message: e.message
        }
      };
    }
  };
};
