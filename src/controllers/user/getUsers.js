const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { getUsersSchema } = require("./validation");

module.exports = function makeGetUsers({ listUser }) {
  return async function getUsers(httpRequest) {
    try {
      const validator = httpValidator(
        { params: httpRequest.params },
        getUsersSchema
      );
      console.log("Validation successful", httpRequest.params);
      const { error, params } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const result = await listUser({ ...params });

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
