const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: String,
    total: Number,
    exp: Number,
    level: Number,
    balance: Number,
    bank: Number,
    boost: Number,
    inventory: [String]
})

module.exports = mongoose.model("Levels", guildSchema);