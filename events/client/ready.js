const mongoose = require("mongoose");
const { WebhookClient } = require('discord.js');

const hook = new WebhookClient({url: process.env.url});

module.exports = async (client) => {
    try {
        await client.user.setActivity(`các thành viên Noobs`);
        await mongoose.connect(process.env.mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        hook.send('Bot started!');
        await require("../../tools/database/updateGuild")(client);
        await require("../../tools/cache/loadGuild")(client);
        await require('../../tools/cache/loadTimeout')(client);
        await require('../../tools/cache/loadAfk')(client);
        await require('../../tools/cache/loadInvites')(client);
        await require('../../tools/collectors/roles')(client);
        //await require('../../tools/converter/txtToArray')();
        console.log(`${client.user.username} is online - It took ${require("ms")((new Date() - client.startup), { long: true })}`);
        const text = [
            `xem ${client.guilds.cache.get("721203266452586507").members.cache.size} tv`,
            `chực post link bậy`,
            `xem ai đó react sao vàng`,
            `thả thính là đam mê`,
            `lỗi thì gọi thằng Cat`,
            `noobs là một cộng đồng`,
            `vào luật để đọc luật`,
            `nếu có vấn đề, ib cho mod`,
            `xem mấy con giời xàm lờ`,
            `ăn cơm tró thường niên`,
            `vui lên vì đời cho phép`,
            `các thành viên Noobs`
        ]
        let i = 0;
        setInterval(() => {
            client.user.setActivity(text[i]);
            i == text.length - 1 ? i = 0 : i++;
        }, 15000);
        setInterval(() => {
            require('../../tools/functions/deleteVoices')(client);
        }, 216000000)
    } catch (e) {
        return require("../../tools/functions/error")(e, undefined)
    }
}
