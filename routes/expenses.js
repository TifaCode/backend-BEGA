var express = require("express");
var router = express.Router();
const authentication = require("../middleware/authentification");
const {
  addExpense,
  updateExpenseById,
  deleteExpenseById,
  getAllDepenseByEvent,
} = require("../controller/expensesController");

router.post("/addexpense", addExpense); //req.body.price, req.body.userId, req.body.expenseName, req.body.invoiceImg, req.body.eventId
router.put("/updateexpense", updateExpenseById); //req.body.id, req.body.price, req.body.expenseName, req.body.invoiceImg
router.delete("deleteexpense", deleteExpenseById); //req.body.id
router.get("/getalldepense", getAllDepenseByEvent); //req.body.id

module.exports = router;
