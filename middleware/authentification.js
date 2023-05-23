const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authentication = async (req, res, next) => {
  try {
    const authToken = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(authToken, process.env.SECRET_PHRASE);
    const user = await User.findOne({
      _id: decodedToken._id,
      "authTokens.authToken": authToken,
    });

    if (!user) throw new Error("pb token");

    req.authToken = authToken;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ err: "authentifiez vous" });
  }
};

module.exports = authentication;
