const express = require("express");
const userRouter = require("./user/router");
const categoryRouter = require("./category/router");
const feedbackRouter = require("./feedback/router");
// const applicationRouter = require("./application/router");

const api = express.Router();

api.use("/api", userRouter);
api.use("/api", categoryRouter);
api.use("/api", feedbackRouter);
// api.use("/api", applicationRouter);

module.exports = api;