var express = require("express");
var router = express.Router();
const {
  addEvent,
  findEvent,
  findAllEventByUser,
  deleteEvent,
  addFriendsOnEvent,
} = require("../controller/eventController");

router.post("/addevent", addEvent);
router.get("/findevent/:id", findEvent);
router.get("/findallevents/:id", findAllEventByUser);
router.delete("/deleteevent", deleteEvent);
router.post("/addfriendsonevent", addFriendsOnEvent);

module.exports = router;
