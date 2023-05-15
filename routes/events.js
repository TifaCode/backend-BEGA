var express = require("express");
var router = express.Router();
const {
  addEvent,
  findEvent,
  findAllEvent,
} = require("../controller/eventController");

router.post("/addevent", addEvent);
router.get("/findevent/:id", findEvent);
router.get("/findallevents", findAllEvent);

module.exports = router;
