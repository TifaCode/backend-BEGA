var express = require("express");
var router = express.Router();
const {
  addEvent,
  findEvent,
  findAllEventByUser,
  deleteEvent,
  addFriendsOnEvent,
  updateEvent,
} = require("../controller/eventController");

router.post("/addevent", addEvent); //req.body.title, req.body.location, req.body.description, req.body.userId, req.body.role;
router.get("/findevent/:id", findEvent); //req.params.id;
router.get("/findallevents/:id", findAllEventByUser); //req.params.id;
router.delete("/deleteevent", deleteEvent); //req.body.id;
router.post("/addfriendsonevent", addFriendsOnEvent); //req.body.userId, req.body.role, req.body.eventId;
router.put("/updateevent", updateEvent);

module.exports = router;
