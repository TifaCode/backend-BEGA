var express = require('express');
var router = express.Router();
const { addEvent, findEvent } = require('../controller/eventController')

router.post('/addevent', addEvent);
router.get('/findevent', findEvent);


module.exports = router;