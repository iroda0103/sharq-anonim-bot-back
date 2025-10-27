/**
 * @param {{ body?: object, query?: object, params?: object}} data
 */
module.exports = function httpValidator(data, schema) {
  return Object.freeze({
    validate
  });
  async function validate() {
    const sanitizedData = {};
    
    for (const type of ["body", "query", "params"]) {
      if (!data[type]) continue;
      const { error, value } = schema[type].validate(data[type]);

      if (error) {
        return { error: error.details[0].message };
      }

      sanitizedData[type] = value;
    }
    return { error: null, ...sanitizedData };
  }
};
