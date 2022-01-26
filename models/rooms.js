const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  _id: String,
  owner: {
    type: String,
    required: true,
    unique: true,
  },
  allow: {
    type: [String],
    required: true,
    default: [],
  },
  deny: {
    type: [String],
    required: true,
    default: [],
  },
  lock: {
    type: Boolean,
    required: true,
    default: false,
  },
  sleep: {
    type: Boolean,
    required: true,
    default: false,
  },
  defend: {
    type: [String],
    required: true,
    default: [],
  },
  mute: {
    type: [String],
    required: true,
    default: [],
  },
})

module.exports = mongoose.model("Rooms", guildSchema);