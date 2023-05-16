const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    price: Number,
    userId: [
        {
          type: mongoose.Types.ObjectId,
          ref: "users",
        },
    ],
    todoId: [
        {
          type: mongoose.Types.ObjectId,
          ref: "todos",
        },
    ],
    expenseName: String,
    invoiceImg: String,
    createdAt: { type: Date, default: Date.now },
});

const Expense = mongoose.model("expenses", expenseSchema);

module.exports = Expense;