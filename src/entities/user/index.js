const Hash = require("../../adapters/Hash");
const Id = require("../../adapters/Id");
const buildMakeUser = require("./user");

const makeUser = buildMakeUser({ Id, Hash });

module.exports = makeUser;