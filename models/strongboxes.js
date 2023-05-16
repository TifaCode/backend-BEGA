const mongoose = require("mongoose");

const strongboxSchema = new mongoose.Schema({
    creatorId: String,
    createdAt: { type: Date, default: Date.now },
    total: Number,
});

const Strongbox = mongoose.model("strongboxes", strongboxSchema);

module.exports = Strongbox;