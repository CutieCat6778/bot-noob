const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  _id: String,
  embedId: String
})

module.exports = mongoose.model("Starboard", guildSchema);