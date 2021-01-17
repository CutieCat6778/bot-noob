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
        roles:[{
            _id: String,
            users: [{
                _id: String, sex: Boolean
            }],
            age: String
        }],
        newMem:[{
            num: Number, content: String
        }],
        form: String
    },
    prefix: String,
    hook: {
        id: String, token: String
    }
})

module.exports = mongoose.model("Guild", guildSchema);