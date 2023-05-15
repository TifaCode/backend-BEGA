var express = require('express');
var router = express.Router();

const Event = require('../models/events');

/*router.post('/', (req, res) => {
 const { title, place, description } = req.body;
 const newEvent = new Event({ title, place, description });

 newEvent.save().then(() => {
    res.json({ result: true });
 });
});

router.get('/events/:title', (req, res) => {
   Event.find({ title: req.params.title }).then(() => {
      res.json({ result: true, title: event.title });
   });
});*/


module.exports = router;