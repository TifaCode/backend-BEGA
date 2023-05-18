const Expense = require("../models/expenses");
const { Event } = require("../models/events");

const addExpense = async (req, res) => {
  const { price, userId, expenseName, invoiceImg, eventId } = req.body;
  const newExpense = new Expense({
    price,
    userId,
    expenseName,
    invoiceImg,
  });
  try {
    const saveNewExpense = newExpense;
    await saveNewExpense.save();

    const event = await Event.findById(eventId);
    event.depenseId.push(saveNewExpense._id);
    event.save();

    res.json({ result: true, saveNewExpense });
  } catch (e) {
    res.json({ result: false, error: "impossible par a ma main" });
  }
};

const updateExpenseById = async (req, res) => {
  const { id, price, expenseName, invoiceImg } = req.body;
  const updateExpense = await Expense.updateOne(
    { id },
    { price, expenseName, invoiceImg }
  );
  if (updateExpense) {
    res.json({
      result: true,
      error: "mise a jour effectué",
    });
  } else {
    res.json({ result: false, error: "Impossible à modifier" });
  }
};

const deleteExpenseById = async (req, res) => {
  const { id } = req.body;
  const deleteExpense = await Expense.deleteOne(id);
  if (deleteExpense.deletedCount > 0) {
    res.json({ result: true, error: "Dépense supprimé" });
  }
  res.json({ result: false, error: "Dépense impossible à supprimer" });
};

const getAllDepenseByEvent = async (req, res) => {
  const { id } = req.body;
  const allDepense = await Event.findById(id).populate("depenseId");
  if (allDepense) {
    res.json({ result: true, depense: allDepense.depenseId });
  } else res.json({ result: false });
};

module.exports = {
  addExpense,
  updateExpenseById,
  deleteExpenseById,
  getAllDepenseByEvent,
};
