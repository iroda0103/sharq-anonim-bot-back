const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { postCategorySchema } = require("./validation");

module.exports = function makePostCategory({ addCategory }) {
  return async function postCategory(httpRequest) {
    try {
      const validator = httpValidator(
        { body: httpRequest.body },
        postCategorySchema
      );
      const { error, body } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const data = await addCategory({ ...body, ...httpRequest.file, ...httpRequest.files });

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
          "Content-Type": "application/json"
        },
        statusCode: mapErrorToStatus(e),
        body: {
          message: e.message
        }
      };
    }
  };
};
