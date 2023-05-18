var express = require("express");
var router = express.Router();
const authentication = require("../middleware/authentification");
const {
  createStrongbox,
  getStrongboxByEvent,
  deleteStrongbox,
} = require("../controller/strongboxController");

router.post("/createstrongbox", createStrongbox); //req.body.creatorId, req.body.eventId;
router.get("/getstrongbox/:eventId", getStrongboxByEvent); // req.body.eventId
router.delete("/deletestrongbox", deleteStrongbox); //req.body.strongboxId;

module.exports = router;
