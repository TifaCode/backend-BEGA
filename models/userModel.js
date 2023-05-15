const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate(v) {
      if (!validator.isEmail(v)) throw new Error("email non valide");
    },
  },
  password: {
    type: String,
    required: true,
    validate(v) {
      if (!validator.isLength(v, { min: 6, max: 20 })) {
        throw new Error("Mot de passe doit etre entre 6 et 20 caractères");
      }      
    },
  },
  avatar: String,
  authTokens: [
    {
      authToken: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthTokenAndSaveUser = async function () {
  const authToken = jwt.sign({ _id: this._id.toString() }, "phraseSecrete");
  this.authTokens.push({ authToken });
  await this.save();
  return authToken;
};

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

const User = mongoose.model("users", userSchema);

module.exports = User;
