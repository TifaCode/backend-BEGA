var express = require("express");
var router = express.Router();
const authentication = require("../middleware/authentification");
const { createTransaction } = require("../controller/transactionController");

router.post("/createtransaction", createTransaction); //req.body.amount, req.body.userId;

module.exports = router;