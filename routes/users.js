var express = require("express");
var router = express.Router();
const { SignUpUser, signInUser } = require("../controller/userController");

/* post users listing. */
router.post("/signup", SignUpUser);
router.post("/signin", signInUser);

module.exports = router;
