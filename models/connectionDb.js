const mongoose = require("mongoose");
var express = require("express");
var app = express();

mongoose
  .connect(process.env.CONNECT_DB, {
    connectTimeoutMS: 1000,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(55555, () => {
      console.log("connected on Port: 55555");
    });
    console.log("Connected");
  })
  .catch((error) => {
    console.log(error, error.message);
  });
