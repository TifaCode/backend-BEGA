var express = require("express");
var router = express.Router();
const authentication = require("../middleware/authentification");
const {
  signUpUser,
  signInUser,
  logout,
} = require("../controller/userController");

/* post users listing. */
router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/logout", authentication, logout);

module.exports = router;
