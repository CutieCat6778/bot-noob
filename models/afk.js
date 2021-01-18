const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    status: String,
    enable: Boolean,
    from: String,
    name: Boolean,
    _id: String
})

module.exports = mongoose.model("Afk", guildSchema);