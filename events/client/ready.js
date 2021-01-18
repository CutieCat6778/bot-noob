const mongoose = require("mongoose");

module.exports = async (client) => {
    try {
        await client.user.setActivity(`noobs members`, { type: "WATCHING" });
        await mongoose.connect(process.env.mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        await require("../../tools/cache/loadGuild")(client);
        await require('../../tools/cache/loadTimeout')(client);
        await require('../../tools/cache/loadAfk')(client);
        console.log(`${client.user.username} is online - It took ${require("ms")((new Date() - client.startup), { long: true })}`);
    } catch (e) {
        return require("../../tools/functions/error")(e, undefined)
    }
}
