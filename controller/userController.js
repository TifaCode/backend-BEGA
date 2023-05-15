const User = require("../models/userModel");

const SignUpUser = async (req, res) => {
  const user = new User(req.body);

  try { const authToken = await user.generateAuthTokenAndSaveUser();
  res.status(201).json({ user, authToken }) }
  catch { res.json({ result: false, error: 'Cannot create user' }) }
};

const signInUser = async (req, res) => {
  try { const user = await User.findOne({ email: req.body.email })
    user && res.json({ result: true, user}) } 
  catch { res.json({ result: false, error: 'User not found' }) }
};

module.exports = { SignUpUser, signInUser };
