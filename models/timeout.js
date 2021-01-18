const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    from: String,
    to: String,
    function: String
})

module.exports = mongoose.model("Timeout", guildSchema);