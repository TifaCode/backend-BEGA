const Expense = require("../models/expenses");

const addExpense = async (req, res) => {
  const { price, userId, expenseName, invoiceImg } = req.body;
  const newExpense = new Expense({
    price,
    userId,
    expenseName,
    invoiceImg,
  });
  try {
    const saveNewExpense = newExpense;
    await saveNewExpense.save();
    res.json({ result: true, saveNewExpense });
  } catch (e) {
    res.json({ result: false, error: "impossible par a ma main" });
  }
};

module.exports = { addExpense };
