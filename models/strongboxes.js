const mongoose = require("mongoose");

const strongboxSchema = new mongoose.Schema({
    creatorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
    transactionId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "transactions",
        }],
    createdAt: { type: Date, default: Date.now },
    total: Number,
});

const Strongbox = mongoose.model("strongboxes", strongboxSchema);

module.exports = Strongbox;