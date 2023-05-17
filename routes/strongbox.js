var express = require("express");
var router = express.Router();
const authentication = require("../middleware/authentification");
const {
    createStrongbox,
} = require("../controller/strongboxController");

router.post("/createstrongbox", createStrongbox); //req.body.creatorId, req.body.eventId;

module.exports = router;