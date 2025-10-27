const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { getUserSchema } = require("./validation");

module.exports = function makeGetUser({ showUser }) {
  return async function getUser(httpRequest) {
    try {
      const validator = httpValidator(
        { params: httpRequest.params },
        getUserSchema
      );
      const { error, params } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const result = await showUser({ ...params });

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
