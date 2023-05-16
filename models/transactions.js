const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    amount: Number,
    userId: String,
    cagnotteId: String,
});

const Transaction = mongoose.model("transactions", transactionSchema);

module.exports = Transaction;