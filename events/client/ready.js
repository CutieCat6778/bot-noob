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
            const colors = ["#ee1c25", "#f26521", "#f7941d", "#ffc20f", "#fef200", "#cadb2a", "#8ec63f", "#3ab549", "#01a553", "#00a674", "#01a89e", "#00abc5", "#008fd5", "#0072bb", "#0054a5", "#2e3192", "#662e91", "#92278f", "#92278f", "#bd1a8d", "#ed008c", "#ec0974", "#ed145b", "#ed1941"];
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
