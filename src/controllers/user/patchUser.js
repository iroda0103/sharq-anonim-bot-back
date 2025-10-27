const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { patchUserSchema } = require("./validation");

module.exports = function makePatchUser({ editUser }) {
  return async function patchUser(httpRequest) {
    try {
      const validator = httpValidator(
        { body: httpRequest.body, params: httpRequest.params },
        patchUserSchema
      );
      const { error, body, params } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const data = await editUser({ ...params, ...body });

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
