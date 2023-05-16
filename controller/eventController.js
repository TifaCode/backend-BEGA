const Event = require("../models/events");
const User = require('../models/userModel');

const addEvent = async (req, res) => {
  const { title, location, description } = req.body;
  const newEvent = new Event({ title, location, description });

  try {
    const saveEvent = newEvent;
    await saveEvent.save();
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
    if (!event) res.json ("Event not found");
    res.json({ result: true, event });
  } catch (e) {
    res.json({ result: false, error });
  }
};

const deleteEvent = async (req, res) => {
  const deleteEvent = await Event.deleteOne({ _id: req.body.id })
  if (deleteEvent.deletedCount > 0) {
    res.json({ result: true });
  } else {
    res.json({ result: false, error: 'Event not fount' });
  }
};

const addFriendsOnEvent = async (req, res) => {
  const addFriendsOnEvent = (req.body.id);
  const getEvent = await Event.findById(req.body.event);
  addFriendsOnEvent.forEach(element => {
    User.findById(element).then((data) => {
      if (data) {
        console.log(getEvent)
        getEvent.participants.push(element)
      } else {
        res.json({result: false})
      }
    }).catch(e => res.json({result: false}))
  });
  res.json({result: true});
};

module.exports = { addEvent, findEvent, findAllEvent, deleteEvent, addFriendsOnEvent };
