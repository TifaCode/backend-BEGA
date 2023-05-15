const mongoose = require("mongoose");
const validator = require("validator");

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
      token: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: Date,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
