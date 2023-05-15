const Event = require('../models/events');

const createEvent = async (req, res) => {
    const newEvent = new Event({ title, place, description });

    try {
        newEvent.save();
        res.json({ result: true })
    } catch {
    res.json({ result: false, error: "Cannot create event" });
    }
};

const searchEvent = async (req, res) => {
    const event = await Event.findOne({ title: req.params.title });

    try {
        res.json({ result: true, event})
    } catch {
        res.json({ result: false, error: 'Event not found'})
    }
};


module.exports = { createEvent, searchEvent };