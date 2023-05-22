var express = require("express");
var router = express.Router();
const authentication = require("../middleware/authentification");
const {
  signUpUser,
  signInUser,
  logout,
  userProfil,
  updateProfil,
  emailSentToResetPassword,
  resetPasswordFromEmail,
  getFriends,
} = require("../controller/userController");

/* post users listing. */
router.post("/signup", signUpUser); //req.body.email;
router.post("/signin", signInUser); //req.body.email;
router.post("/logout", authentication, logout); //req.user.authTokens;
router.get("/userprofil", authentication, userProfil); //req.user;
router.post("/updateprofil", authentication, updateProfil); // req.body.userId, req.bodyfirstname, req.bodylastname, req.body.email, req.body.password
router.post("/resetpassword", emailSentToResetPassword); // req.body.email, envoi email
router.post("/mailresetpassword/:userId/:token", resetPasswordFromEmail); // req.body.password, reset password
router.get("/getfriends/:userId", getFriends);

module.exports = router;
