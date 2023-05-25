const User = require("../models/userModel");

const findFriendByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const findUser = await User.find(
      { email: { $regex: email, $options: "i" } },
      "email _id "
    );
    console.log(email);
    if (!findUser) return res.json({ result: false, error: "Not found !" });
    return res.json({ result: true, user: findUser });
  } catch (error) {
    return res.json({ result: false, error: "Impossible" });
  }
};

//////////////envoyer une demande d'ami///////////////
const askFriend = async (req, res) => {
  const { userIdMe, userIdHim, myName } = req.body;
  const newAskFriend = {
    userId: userIdMe,
    message: `${myName}, vous a demandé en ami`,
  };
  console.log(userIdHim, userIdMe, myName);
  try {
    const findFriend = await User.findById(userIdHim);
    if (!findFriend) return res.json({ result: true, error: "No User" });
    findFriend.askFriend.push(newAskFriend);
    const saveFriendMessage = await findFriend.save();
    return res.json({ result: true, message: saveFriendMessage });
  } catch (error) {
    return res.json({ result: false, error: "Impossible request" });
  }
};

const getAskFriendMessage = async (req, res) => {
  const { userId } = req.params;
  try {
    const findMessage = await User.findById(userId).select("askFriend");
    if (!findMessage)
      return res.json({ result: false, error: "User nor found!" });
    return res.json({ findMessage });
  } catch (error) {
    return res.json({ result: false, error: "Impossible" });
  }
};

const acceptFriend = async (req, res) => {
  const { userIdMe, userIdHim } = req.body;
  console.log(userIdHim, userIdMe);
  try {
    const findFriendMe = await User.findById(userIdMe);
    const findFriendHim = await User.findById(userIdHim);
    findFriendMe.askFriend.remove({ userId: userIdHim });
    await findFriendMe.save();

    findFriendHim.friends.push(userIdMe);
    findFriendMe.friends.push(userIdHim);
    const addFriendMe = findFriendMe;
    await addFriendMe.save();
    const addFriendHim = findFriendHim;
    await addFriendHim.save();

    return res.json({ result: true, message: "ajouté" });
  } catch (error) {
    return res.json({ result: false, error: "Impossible" });
  }
};

const refusedFriend = async (req, res) => {
  const { userIdHim, userIdMe } = req.body;
  console.log(userIdHim, userIdMe);

  try {
    const user = await User.findById(userIdMe);
    user.askFriend.remove({ userId: userIdHim });
    await user.save();
    return res.json({ result: true, message: "deleted" });
  } catch (error) {
    return res.json({ error: "error" });
  }
};

module.exports = {
  askFriend,
  getAskFriendMessage,
  acceptFriend,
  refusedFriend,
  findFriendByEmail,
};
