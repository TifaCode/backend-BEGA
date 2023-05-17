const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  _id: false,
  id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  role: { type: String, enum: ["admin", "moderator", "participant"] },
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: Date,
  location: { type: String, required: true },
  description: { type: String, required: true },
  participants: [participantSchema],
  status: Boolean,
  created_at: Date,
  depenseId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "depenses",
    },
  ],
  todoId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "todos",
    },
  ],
  strongboxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "strongboxes",
  },
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("events", eventSchema);
const Participant = mongoose.model("participants", participantSchema);

module.exports = { Event, Participant };
