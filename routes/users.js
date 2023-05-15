var express = require("express");
var router = express.Router();
const User = require("../models/userModel");

/* post users listing. */
router.post("/signup", async function (req, res, next) {
  const { email, password } = req.body;
  console.log(email, password);
  const newUser = new User({
    email,
    password,
  });
  await newUser.save();
  //const authToken = await newUser.generateAuthTokenAndSaveUser();
  res.status(201).json({ newUser: newUser });
});

module.exports = router;
