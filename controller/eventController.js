const { Event, Participant } = require("../models/events");
const User = require("../models/userModel");
const Strongbox = require("../models/strongboxes");
const { checkBody } = require("../middleware/checkBody");

const addEvent = async (req, res) => {
  const { title, location, description, userId, role } = req.body;
  const newEvent = new Event({ title, location, description });
  
  try {
    const saveEvent = newEvent;
    newEvent.participants.push({ id: userId, role });
    await saveEvent.save();
    res.json({ result: true, newEvent });
  } catch {
    res.json({ result: false, error: "Cannot create event" });
  }
};

const findAllEventByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const getAllEvents = await Event.find({ participants: id });
    res.json({ result: true, getAllEvents });
  } catch (e) {
    res.json({ result: false, error: "Cannot get all events" });
  }
};

const findEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id).populate({
      path: "strongboxId",
      populate: { path: "transactionId" },
    });
    if (!event) res.json({result: false, error: "Event not found"});
    res.json({ result: true, event });
  } catch (e) {
    res.json({ result: false, error: "Event not found" });
  }
};

const deleteEvent = async (req, res) => {
  const deleteEvent = await Event.deleteOne({ _id: req.body.id });
  if (deleteEvent.deletedCount > 0) {
    res.json({ result: true, error: "Event deleted" });
  } else {
    res.json({ result: false, error: "Event not fount" });
  }
};

const addFriendsOnEvent = async (req, res) => {
  if (!checkBody(req.body, ["eventId", "userId", "role"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  if (Array.isArray(req.body.userId)) {
    await Event.updateOne(
      { _id: req.body.eventId },
      {
        $addToSet: {
          participants: {
            $each: { id: req.body.userId, role: req.body.role },
          },
        },
      }
    );
    res.json({ result: true, error: "Friend invited" });
  } else if (typeof req.body.userId === "string") {
    await Event.updateOne(
      { _id: req.body.eventId },
      {
        $addToSet: {
          participants: {
            id: req.body.userId,
            role: req.body.role,
          },
        },
      }
    );
    res.json({ result: true, error: "Friend invited"});
  }
};

module.exports = {
  addEvent,
  findEvent,
  findAllEventByUser,
  deleteEvent,
  addFriendsOnEvent,
};
