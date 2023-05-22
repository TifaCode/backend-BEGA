const User = require("../models/userModel");
const { checkBody } = require("../middleware/checkBody");
const bcrypt = require("bcrypt");
const sendEmail = require("../middleware/sendEmail");
const { v4: uuidv4 } = require("uuid");

////////////////////SIGNUP////////////////////////////////////////////////////
const signUpUser = async (req, res) => {
  // if (!checkBody(req.body, ["email", "password"])) {
  //   res.json({ result: false, error: "Missing or empty fields" });
  //   return;
  // }
  const newUser = new User(req.body);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.json({ result: false, error: "user already exist !" });

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
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) res.json({ result: false, error: "no user" });
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword)
      res.json({ result: false, error: "Impossible de se connecter" });
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.json({ user, authToken });
  } catch (error) {
    res.json({ result: false, error: "impossible" });
  }
};
//////////////////////LOGOUT//////////////////////////////////////////////

const logout = async (req, res) => {
  try {
    req.user.authTokens = req.user.authTokens.filter((authToken) => {
      return authToken.authToken !== req.authToken;
    });

    let deleteToken = await req.user;
    await deleteToken.save();
    res.json({ result: true, error: "deconnected" });
  } catch (e) {
    res.status(500).send({ result: false, error: "Deconnection not possible" });
  }
};

//////////////////////USER PROFIL//////////////////////////////////////////////
const userProfil = (req, res) => {
  if (req.user) {
    req.user.select = false;
    res.json({ result: true, user: req.user });
  } else {
    res.json({ result: false, error: "jsuis pas venu ici pour souffrir ok ?" });
  }
};

//////////////////////UPDATE PROFIL//////////////////////////////////////////////

const updateProfil = async (req, res) => {
  const { firstname, lastname, email } = req.body;

  const user = User.find(req.user.userId);
  if (!user) {
    res.json({ result: false, error: " Impossible a modifier " });
  } else if (req.body.password !== "") {
    let newPassword = await bcrypt.hash(req.body.password, 5);
    await user.updateOne({
      firstname,
      lastname,
      email,
      password: newPassword,
    });
    res.json({ result: true, error: "Porfil modifié" });
  } else {
    await user.updateOne({
      firstname,
      lastname,
      email,
    });
    res.json({ result: true, error: "Porfil modifié" });
  }
};
/////////////////////////////////////Reset password////////////////////////////
const emailSentToResetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) res.json({ result: false, error: "pas d'utilisateur" });
    else {
      let token = uuidv4();
      user.tokenPasswordReset = token;
      user.save();
      const link = `https://resetpasswordbega.vercel.app/${user._id}/${token}`; //urlfront
      sendEmail(email, "reset your password", link);
      res.json({
        result: true,
        error: "a link sent to reset your email password",
      });
    }
  } catch (error) {
    res.json({ result: false, error: "Impossible" });
  }
};
/////////////////le front doit récuprer les params de l'url et les envoyer au back
const resetPasswordFromEmail = async (req, res) => {
  const { userId, token } = req.params;
  try {
    const user = await User.findOne({ tokenPasswordReset: token, _id: userId });
    if (!user) res.json({ result: false, error: "Impossible" });
    else {
      let newPassword = await bcrypt.hash(req.body.password, 5);
      await user.updateOne({ password: newPassword });
      user.tokenPasswordReset = undefined;
      user.save();
      res.json({ result: true, error: "Modified" });
    }
  } catch (error) {
    res.json({ result: false, error: "Impossible" });
  }
};
/////////////////////////////Friends//////////////////////////////////////////////
const getFriends = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("friends");
    if (!user) res.json({ result: false, error: "Pas d'amis" });
    res.json({ user });
  } catch (error) {
    res.json({ result: false, error: "impossible" });
  }
};
///////////////////////////////////////////////////////////////////////////

module.exports = {
  signUpUser,
  signInUser,
  logout,
  userProfil,
  updateProfil,
  emailSentToResetPassword,
  resetPasswordFromEmail,
  getFriends,
};
