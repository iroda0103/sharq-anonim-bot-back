const mongoose = require("mongoose");
const config = require("../shared/config");
const userDb = require("./userDb");
const feedbackDb = require("./feedbackDb");
const categoryDb = require("./categoryDb");
console.log(config.db.url);

module.exports = {
  connect() {
    return mongoose.connect(
        `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
      // config.db.url
    );
  },
  userDb,
  feedbackDb,
  categoryDb
};