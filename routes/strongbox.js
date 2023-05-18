var express = require("express");
var router = express.Router();
const authentication = require("../middleware/authentification");
const {
  createStrongbox,
  getStrongboxByEvent,
} = require("../controller/strongboxController");

router.post("/createstrongbox", createStrongbox); //req.body.creatorId, req.body.eventId;
router.get("/getstrongbox/:eventId", getStrongboxByEvent); // req.body.eventId

module.exports = router;
