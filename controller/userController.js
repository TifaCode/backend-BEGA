const User = require("../models/userModel");

const SignUpUser = async (req, res) => {
  const user = new User(req.body);

  const authToken = await user.generateAuthTokenAndSaveUser();
  res.status(201).json({ user, authToken });
};

module.exports = { SignUpUser };