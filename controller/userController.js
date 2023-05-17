const User = require("../models/userModel");
const { checkBody } = require("../middleware/checkBody");
const bcrypt = require("bcrypt");

////////////////////SIGNUP////////////////////////////////////////////////////
const signUpUser = async (req, res) => {
  // if (!checkBody(req.body, ["email", "password"])) {
  //   res.json({ result: false, error: "Missing or empty fields" });
  //   return;
  // }
  const newUser = new User(req.body);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.json({ result: false, error: "user already exist !" });

    await newUser.generateAuthTokenAndSaveUser();
    res.status(201).json({ result: true, user: newUser });
  } catch {
    res.json({ result: false, error: "Cannot create user" });
  }
};
////////////////////SIGNIN////////////////////////////////////////////////////
const signInUser = async (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const user = await User.findOne({ email: req.body.email });

  try {
    if (!user) return res.json({result: false, error: "Connection not possible"});
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) return res.json({result: false, error: "Connection not possible"});
    res.json({ result: true, user });
  } catch {
    res.json({ result: false, error: "User not found" });
  }
};

//////////////////////LOGOUT//////////////////////////////////////////////

const logout = async (req, res) => {
  try {
    req.user.authTokens = req.user.authTokens.filter((authToken) => {
      return authToken.authToken !== req.authToken;
    });

    let deleteToken = await req.user;
    deleteToken.save();
    res.json({ result: true, error: "deconnected" });
  } catch (e) {
    res.status(500).send({result: false, error: "Deconnection not possible"});
  }
};

//////////////////////USER PROFIL//////////////////////////////////////////////
const userProfil = (req, res) => {
  if (req.user) {
    res.json({result: true, user: req.user})
  } else {
    res.json({result: false, error: "jsuis pas venu ici pour souffrir ok ?"})
  }
};

module.exports = { signUpUser, signInUser, logout, userProfil };
