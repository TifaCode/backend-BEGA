var express = require("express");
var router = express.Router();
const authentication = require("../middleware/authentification");
const { addExpense } = require("../controller/expensesController");

router.post("/addexpense", addExpense); //req.body.price, req.body.userId, req.body.expenseName, req.body.invoiceImg;

module.exports = router;
