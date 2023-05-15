const mongoose = require("mongoose");
var express = require("express");
var app = express();

mongoose
  .connect(process.env.CONNECT_DB, {
    connectTimeoutMS: 2000,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log(error, error.message);
  });
