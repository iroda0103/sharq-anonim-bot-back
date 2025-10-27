const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { getUsersSchema } = require("./validation");

module.exports = function makeGetUsers({ listUser }) {
  return async function getUsers(httpRequest) {
    try {
      const validator = httpValidator(
        { query: httpRequest.query },
        getUsersSchema
      );
      const { error, query } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const result = await listUser({ ...query });

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
