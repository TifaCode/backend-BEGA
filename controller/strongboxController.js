const { Event } = require("../models/events");
const User = require("../models/userModel");
const Strongbox = require("../models/strongboxes");
const { checkBody } = require("../middleware/checkBody");

const createStrongbox = async (req, res) => {
  const newStrongbox = new Strongbox({
    creatorId: req.body.creatorId,
    total: 0,
  });

  try {
    const saveStrongbox = newStrongbox;
    await saveStrongbox.save();
    await Event.updateOne(
      { _id: req.body.eventId },
      { strongboxId: saveStrongbox.id }
    );
    res.json({ result: true, saveStrongbox });
  } catch {
    res.json({ result: false, error: "Cannot create strongbox" });
  }
};

const getStrongboxByEvent = async (req, res) => {
  const { eventId } = req.params;
  const strongboxEvent = await Event.findById(eventId).populate("strongboxId");
  if (strongboxEvent) {
    const resultStronbox = await strongboxEvent.strongboxId.populate(
      "transactionId"
    );
    res.json({ result: true, strongbox: resultStronbox });
  } else res.json({ result: false });
};

const deleteStrongbox = async (req, res) => {
  try {
    const deleteStrongbox = await Strongbox.deleteOne({ _id: req.body.strongboxId });
    if (deleteStrongbox.deletedCount > 0) {
      res.json({ result: true, error: "Strongbox is deleted" });
    } else {
      res.json({ result: false, error: "Delete strongbox is not possible" });
    }
  } catch (e) {
    res.json({ result: false, error: "Delete strongbox is not possible" });
  }
};

module.exports = {
  createStrongbox,
  getStrongboxByEvent,
  deleteStrongbox,
};
