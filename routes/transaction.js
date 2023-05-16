var express = require("express");
var router = express.Router();
const authentication = require("../middleware/authentification");
const { createTransaction } = require("../controller/transactionController");

router.post("/createtransaction", createTransaction);

module.exports = router;