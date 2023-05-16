const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("transactions", transactionSchema);

module.exports = Transaction;
