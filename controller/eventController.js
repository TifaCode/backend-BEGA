const Event = require("../models/events");

const addEvent = async (req, res) => {
  const { title, location, description } = req.body;
  const newEvent = new Event({ title, location, description });

  try {
    const saveEvent = await newEvent;
    saveEvent.save();
    res.json({ result: true, newEvent });
  } catch {
    res.json({ result: false, error: "Cannot create event" });
  }
};

const findAllEvent = async (req, res) => {
  try {
    const getAllEvents = await Event.find();
    res.json({ result: true, getAllEvents });
  } catch (e) {
    res.json({ result: false });
  }
};

const findEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);

  try {
    if (!event) throw new Error("impossible find event");
    res.json({ result: true, event });
  } catch (e) {
    res.json({ result: false, error: "Event not found" });
  }
};

module.exports = { addEvent, findEvent, findAllEvent };
