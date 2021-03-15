const mongoose = require("mongoose");
const {WebhookClient} = require('discord.js');
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
        let counter = 0;
        client.setInterval(() => {
            const role = client.guilds.cache.get("721203266452586507").roles.cache.get("820904733455024141");
            const colors = ["#C0392B", "#E74C3C", "#E74C3C", "#8E44AD", "#2980B9", "#3498DB", "#1ABC9C", "#16A085", "#27AE60", "#2ECC71", "#F1C40F", "#F39C12", "#E67E22", "#ECF0F1", "#BDC3C7", "#95A5A6", "#7F8C8D", "#34495E", "#2C3E50"];
            if(counter == colors.length - 1) counter = 0;
            role.setColor(colors[counter]);
            counter++;
        }, 10000)
        console.log(client.timeouts, client.afk);
        console.log(`${client.user.username} is online - It took ${require("ms")((new Date() - client.startup), { long: true })}`);
    } catch (e) {
        return require("../../tools/functions/error")(e, undefined)
    }
}
