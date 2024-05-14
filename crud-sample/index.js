const serverless = require("serverless-http");
const express = require("express");
const app = express();
const userController = require('./controller');

app.get("/", (req, res, next) => {
  const result = userController.ping();
  return res.status(200).json({
    message: result,
  });
});

app.get("/ding", (req, res, next) => {
  console.log("==req", req);
  return res.status(200).json({
    message: "Dong !!!",
  });
});


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
