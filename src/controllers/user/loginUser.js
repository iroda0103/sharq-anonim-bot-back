const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { loginUserSchema } = require("./validation");

module.exports = function makeLoginUser({ loginUser }) {
  return async function postLoginUser(httpRequest) {
    try {
      const validator = httpValidator(
        { body: httpRequest.body },
        loginUserSchema
      );
      const { error, body } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }
      let data = await loginUser({ ...body });
      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 200,
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
