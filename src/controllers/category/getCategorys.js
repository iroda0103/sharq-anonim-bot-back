const { InvalidPropertyError } = require("../../shared/errors");
const { mapErrorToStatus } = require("../../shared/errors/handle");
const httpValidator = require("../../shared/validator");
const { getCategorysSchema } = require("./validation");

module.exports = function makeGetCategorys({ listCategory }) {
  return async function getCategorys(httpRequest) {
    try {
      const validator = httpValidator(
        { query: httpRequest.query },
        getCategorysSchema
      );
      const { error, query } = await validator.validate();

      if (error) {
        throw new InvalidPropertyError(error);
      }

      const result = await listCategory({ ...query });

      return {
        headers: {
          "Content-Type": "Category/json"
        },
        statusCode: 200,
        body: { ...result }
      };
    } catch (e) {
      console.log(e);

      return {
        headers: {
          "Content-Type": "Feedback/json"
        },
        statusCode: mapErrorToStatus(e),
        body: { message: e.message }
      };
    }
  };
};
