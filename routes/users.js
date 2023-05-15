var express = require("express");
var router = express.Router();
const { signUpUser } = require("../controller/userController");

/* post users listing. */
router.post("/signup", signUpUser);

module.exports = router;
