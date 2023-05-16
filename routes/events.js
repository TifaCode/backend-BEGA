var express = require("express");
var router = express.Router();
const {
  addEvent,
  findEvent,
  findAllEvent,
  deleteEvent,
  addFriendsOnEvent,
} = require("../controller/eventController");

router.post("/addevent", addEvent);
router.get("/findevent/:id", findEvent);
router.get("/findallevents", findAllEvent);
router.delete("/deleteevent", deleteEvent);
router.post("/addfriendsonevent", addFriendsOnEvent);

module.exports = router;
