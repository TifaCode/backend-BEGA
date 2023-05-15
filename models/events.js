const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: Date,
  location: { type: String, required: true },
  description: { type: String, required: true },
  participants: [
    {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  ],
  status: Boolean,
  created_at: Date,
  depenseId: [
    {
      type: mongoose.Types.ObjectId,
      ref: "depenses",
    },
  ],
  todoId: [
    {
      type: mongoose.Types.ObjectId,
      ref: "todos",
    },
  ],
  cagnotteId: {
    type: mongoose.Types.ObjectId,
    ref: "cagnottes",
  },
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("events", eventSchema);

module.exports = Event;
