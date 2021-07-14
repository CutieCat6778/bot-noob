const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    id: String,
    from: String,
    to: String,
    function: String,
    args: [String]
})

module.exports = mongoose.model("Timeout", guildSchema);