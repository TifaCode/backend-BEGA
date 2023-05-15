const User = require("../models/userModel");
const { checkBody } = require("../middleware/checkBody");
const bcrypt = require('bcrypt');

const SignUpUser = async (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const user = new User(req.body);

  try {
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.status(201).json({ user, authToken });
  } catch {
    res.json({ result: false, error: "Cannot create user" });
  }
};

const signInUser = async (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const user = await User.findOne({ email: req.body.email });

  try {
    if (!user) throw new Error("Connection not possible");
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) throw new Error("Connection not possible");
    res.json({ result: true, user });
  } catch {
    res.json({ result: false, error: "User not found" });
  }
};

module.exports = { SignUpUser, signInUser };
