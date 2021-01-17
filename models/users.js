const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: String,
    birthday: {
        day: Number,
        month: Number,
        year: Number
    },
    realName: String,
    location: String
})

module.exports = mongoose.model("Users", guildSchema);