const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: String,
    rules: {
        _id: String,
        list: [{
            num: Number, content: String
        }],
        specialRequest: String,
        attention: String,
        newMem:[{
            num: Number, content: String
        }],
        form: String
    },
    prefix: String,
})

module.exports = mongoose.model("Guild", guildSchema);