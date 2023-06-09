var express = require("express");
var app = express();
var router = express.Router();
const User = require("../../models/userModel");

/*  PASSPORT SETUP  */
const passport = require("passport");
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

router.get("/success", async (req, res) => {
  const email = userProfile.emails[0].value;
  const newUser = new User({ email, password: "123456785" }); // voir pass temporaire
  try {
    const user = await User.findOne({ email });
    if (user) {
      await user.generateAuthTokenAndSaveUser();
      res.json(user);
    } else {
      newUser.generateAuthTokenAndSaveUser();
      res.status(201).json({ newUser });
    }
  } catch {
    res.json({ result: false, error: "Cannot create user" });
  }
});
router.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SECRET;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google/error" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("/success");
  }
);

module.exports = router;
