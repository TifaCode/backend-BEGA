const Event = require('../models/events');

const addEvent = async (req, res) => {
    const { title, location, description } = req.body;
    const newEvent = new Event({ title, location, description });

    try {   
        const saveEvent = await newEvent;
        saveEvent.save();
        res.json({ result: true, newEvent })
    } catch {
        res.json({ result: false, error: "Cannot create event" });
    }
};

const findEvent = async (req, res) => {
    const event = await Event.findbydId({ id: req.params.id });
    
    try {
        res.json({ result: true, event})
    } catch {
        res.json({ result: false, error: 'Event not found'})
    }
};

module.exports = { addEvent, findEvent };