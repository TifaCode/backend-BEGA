var express = require('express');
var router = express.Router();

require('../models/connectionDb');
const Event = require('../models/events');

router.post('/events', (req, res) => {
 const { title, place, description } = req.body;
 const newEvent = new Event({ title, place, description });

 newEvent.save().then(() => {
    res.json({ result: true });
 });
});

module.exports = router;