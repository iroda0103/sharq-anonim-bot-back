const Id = require("../../adapters/Id");
const buildMakeCategory = require("./category");

const makeCategory = buildMakeCategory({ Id });

module.exports = makeCategory;