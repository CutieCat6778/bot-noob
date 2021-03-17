const mongoose = require("mongoose");
const { WebhookClient } = require('discord.js');
const { count } = require("../../models/guild");

const hook = new WebhookClient(process.env.hookId, process.env.hookToken);

module.exports = async (client) => {
    try {
        await client.user.setActivity(`các thành viên Noobs`, { type: "WATCHING" });
        await mongoose.connect(process.env.mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        hook.send('Bot started!');
        await require("../../tools/cache/loadGuild")(client);
        await require('../../tools/cache/loadTimeout')(client);
        await require('../../tools/cache/loadAfk')(client);
        await require('../../tools/collectors/roles')(client);
        console.log(client.timeouts, client.afk);
        console.log(`${client.user.username} is online - It took ${require("ms")((new Date() - client.startup), { long: true })}`);
    } catch (e) {
        return require("../../tools/functions/error")(e, undefined)
    }
}
