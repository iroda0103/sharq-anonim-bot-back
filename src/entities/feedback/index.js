const Id = require("../../adapters/Id");
const buildMakeFeedback = require("./feedback");

const makeFeedback = buildMakeFeedback({ Id });

module.exports = makeFeedback;