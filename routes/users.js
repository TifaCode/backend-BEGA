var express = require("express");
var router = express.Router();
const { SignUpUser } = require("../controller/userController");

/* post users listing. */
router.post("/signup", SignUpUser);

module.exports = router;
