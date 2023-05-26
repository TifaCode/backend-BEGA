const { Event } = require("../models/events");
const User = require("../models/userModel");
const Strongbox = require("../models/strongboxes");
const { checkBody } = require("../middleware/checkBody");

const addEvent = async (req, res) => {
  const { title, location, description, userId, role, date, participants } =
    req.body;
  console.log("PART", participants);
  const newEvent = new Event({ title, location, description, date });
  console.log(userId, role);

  try {
    newEvent.participants.push({ userId, role });

    for (const participant of participants) {
      newEvent.participants.push({ userId: participant, role: "participant" });
    }

    console.log("NEW EVENT", newEvent);
    const saveEvent = newEvent;
    await saveEvent.save();
    res.json({ result: true, saveEvent });
    return;
  } catch {
    res.json({ result: false, error: "Cannot create event" });
  }
};

const findAllEventByUser = async (req, res) => {
  const { id } = req.params;
  const events = await Event.find({ "participants.userId": id });
  res.json({ result: true, events });
};

const findEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id)
      .populate({
        path: "strongboxId",
        populate: { path: "transactionId" },
      })
      .populate({
        path: "todoId",
        populate: { path: "userId" },
      })
      .populate({
        path: "participants",
        populate: { path: "userId", select: "firstname" },
      });

      

    if (!event) res.json({ result: false, error: "Event not found" });
    res.json({ result: true, event });
  } catch (e) {
    res.json({ result: false, error: "Event not found" });
  }
};

const deleteEvent = async (req, res) => {
  const deleteEvent = await Event.deleteOne({ _id: req.body.eventId });
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
    res.json({ result: true, error: "Friend invited" });
  }
};

const updateEvent = async (req, res) => {
  const { title, location, description, eventId, participants } = req.body;

  console.log(participants);
  try {
    await Event.updateOne(
      { _id: eventId },
      {
        title,
        location,
        description,
        participants,
      }
    );
    res.json({ result: true, error: "Event updated" });
  } catch (err) {
    res.json({ result: false, error: "Cannot update event", err });
  }
};

module.exports = {
  addEvent,
  findEvent,
  findAllEventByUser,
  deleteEvent,
  addFriendsOnEvent,
  updateEvent,
};
