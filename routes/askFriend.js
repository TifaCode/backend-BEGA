var express = require("express");
var router = express.Router();
const {
  askFriend,
  getAskFriendMessage,
  acceptFriend,
  refusedFriend,
  findFriendByEmail,
} = require("../controller/askFriendController");

router.post("/", askFriend); // userIdMe, userIdHim, myName / req.body;
router.get("/getaskfriendmessage/:userId", getAskFriendMessage);
router.post("/acceptfriend", acceptFriend); // userIdMe, userIdHim / req.body;
router.put("/refusedfriend", refusedFriend); // userIdHim, userIdMe
router.post("/findfriendbyemail", findFriendByEmail);

module.exports = router;
