const Event = require("../models/events");
const User = require("../models/userModel");
const Strongbox = require("../models/strongboxes");
const Transaction = require("../models/transactions");
const { checkBody } = require("../middleware/checkBody");

const createTransaction = async (req, res) => {
  const newTransaction = new Transaction({
    amount: req.body.amount,
    userId: req.body.userId,
  });

  try {
    const saveTransaction = newTransaction;
    await saveTransaction.save();
    await Strongbox.updateOne(
      { _id: req.body.strongboxId },
      { $set: { transactionId: saveTransaction.id } }
    );
    res.json({ result: true, saveTransaction });
  } catch {
    res.json({ result: false, error: "Cannot create this transaction" });
  }
};

module.exports = {
  createTransaction,
};
