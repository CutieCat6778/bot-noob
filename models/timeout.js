const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
	guild: String,
	author: String,
	target: String,
    from: Number,
    to: Number,
    function: String
})

module.exports = mongoose.model("Timeout", guildSchema);