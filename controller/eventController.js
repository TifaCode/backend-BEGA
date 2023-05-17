const { Event } = require("../models/events");
const User = require("../models/userModel");
const Strongbox = require("../models/strongboxes");
const { checkBody } = require("../middleware/checkBody");

const addEvent = async (req, res) => {
  const { title, location, description, userId, role } = req.body;
  const newEvent = new Event({ title, location, description });
  newEvent.participants.push({ id: userId, role: "admin" });

  try {
    const saveEvent = newEvent;
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
    res.json({ result: false });
  }
};

const findEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id).populate({
    path: "strongboxId",
    populate: { path: "transactionId" },
  });

  try {
    if (!event) res.json("Event not found");
    res.json({ result: true, event });
  } catch (e) {
    res.json({ result: false, e });
  }
};

const deleteEvent = async (req, res) => {
  const deleteEvent = await Event.deleteOne({ _id: req.body.id });
  if (deleteEvent.deletedCount > 0) {
    res.json({ result: true });
  } else {
    res.json({ result: false, error: "Event not fount" });
  }
};

const addFriendsOnEvent = async (req, res) => {
  if (!checkBody(req.body, ["eventId", "userId", "role"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  console.log(req.body.eventId, req.body.userId, typeof req.body.role);

  if (Array.isArray(req.body.userId)) {
    console.log("array test");
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
    res.json({ result: true, test: "array" });
  } else if (typeof req.body.userId === "string") {
    console.log("string test");
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
    res.json({ result: true, test: "string" });
  }
};

module.exports = {
  addEvent,
  findEvent,
  findAllEventByUser,
  deleteEvent,
  addFriendsOnEvent,
};
