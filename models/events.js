const mongoose = require("mongoose");

const eventsSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: Date,
  place: { type: String, required: true },
  description: { type: String, required: true },
  participants: [
    {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  ],
  status: Boolean,
  createdAt: { type: Date, default: Date.now },
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
});

const Event = mongoose.model("events", eventsSchema);

module.exports = Event;
