const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    isDone: Boolean,
    description: String,
    taskName: String,
    createdAt: { type: Date, default: Date.now },
    flagHasInvoice: Boolean,
    userId: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
      ],

});

const Todo = mongoose.model("todos", todoSchema);

module.exports = Todo;