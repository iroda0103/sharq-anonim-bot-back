const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { postFeedbackSchema } = require("./validation");

module.exports = function makePostFeedback({ addFeedback }) {
  return async function postFeedback(httpRequest) {
    try {
      const validator = httpValidator(
        { body: httpRequest.body },
        postFeedbackSchema
      );
      const { error, body } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const data = await addFeedback({ ...body, ...httpRequest.file, ...httpRequest.files });

      return {
        headers: {
          "Content-Type": "Feedback/json"
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
