const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { postUserSchema } = require("./validation");

module.exports = function makePostUser({ addUser }) {
  return async function postUser(httpRequest) {
    try {
      const validator = httpValidator(
        { body: httpRequest.body },
        postUserSchema
      );
      const { error, body } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const data = await addUser({ ...body });

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
