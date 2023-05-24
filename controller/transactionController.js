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
    const saveTransaction = await newTransaction.save();
    // await saveTransaction.save();
    await Strongbox.updateOne(
      { _id: req.body.strongboxId },
      { $push: { transactionId: saveTransaction.id } }
    );
    const transactionData = await Transaction.findById(saveTransaction.id).populate({
      path: "userId",
      select: "firstname -_id",
    });
    res.json({ result: true, saveTransaction : transactionData });
  } catch {
    res.json({ result: false, error: "Cannot create this transaction" });
  }
};

module.exports = {
  createTransaction,
};
