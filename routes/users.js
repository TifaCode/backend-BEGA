var express = require("express");
var router = express.Router();
const authentication = require("../middleware/authentification");
const {
  signUpUser,
  signInUser,
  logout,
  userProfil
} = require("../controller/userController");

/* post users listing. */
router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/logout", authentication, logout);
router.get("/userprofil", authentication, userProfil);

module.exports = router;
