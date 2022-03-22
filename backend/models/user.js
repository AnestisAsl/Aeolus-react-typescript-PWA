const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  location: {
    type: [String],
    require: false,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
