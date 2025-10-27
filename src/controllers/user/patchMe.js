const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { patchMeSchema } = require("./validation");

module.exports = function makePatchMe({ editUser }) {
  return async function patchMe(httpRequest) {
    try {
      const validator = httpValidator(
        { body: httpRequest.body },
        patchMeSchema
      );
      const { error, body } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const data = await editUser({ id: httpRequest.user.id, ...body });

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
