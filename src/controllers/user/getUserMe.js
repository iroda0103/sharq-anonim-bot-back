const { mapErrorToStatus } = require("../../shared/errors/handle");

module.exports = function makeGetUserMe({ showUser }) {
  return async function getUserMe(httpRequest) {
    try {
      const result = await showUser({ id: httpRequest.user.id });

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
