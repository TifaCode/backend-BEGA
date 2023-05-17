var express = require("express");
var router = express.Router();
const authentication = require("../middleware/authentification");
const { addExpense } = require("../controller/expensesController");

router.post("/addexpense", addExpense);

module.exports = router;
