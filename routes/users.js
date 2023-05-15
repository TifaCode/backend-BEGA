var express = require("express");
var router = express.Router();
const { signUpUser, signInUser } = require("../controller/userController");

/* post users listing. */
router.post("/signup", signUpUser);
router.post("/signin", signInUser);

module.exports = router;
