const mongoose = require("mongoose");

const strongboxSchema = new mongoose.Schema({
  total: Number,
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  transactionId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "transactions",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Strongbox = mongoose.model("strongboxes", strongboxSchema);

module.exports = Strongbox;
