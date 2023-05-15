const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECT_DB, {
    connectTimeoutMS: 2000,
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log(error, error.message);
  });
