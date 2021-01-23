const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: String,
    total: Number,
    exp: Number,
    level: Number
})

module.exports = mongoose.model("Levels", guildSchema);