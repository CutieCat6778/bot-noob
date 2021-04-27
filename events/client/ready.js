const mongoose = require("mongoose");
const { WebhookClient } = require('discord.js');

const hook = new WebhookClient(process.env.hookId, process.env.hookToken);

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
        //await require('../../tools/collectors/pages')(client);
        //await require('../../tools/converter/txtToArray')();
        console.log(client.timeouts, client.afk);
        console.log(`${client.user.username} is online - It took ${require("ms")((new Date() - client.startup), { long: true })}`);
        const text = [
            `đang xem ${client.users.cache.size} người dùng`,
            `đang ngồi xem ai đó post link bậy`,
            `xem ai đó react sao vàng`,
            `thả thính là đam mê`,
            `Nếu bị hỏng thì gọi thằng Cat`,
            `noobs là một cộng đồng`,
            `vào luật để đọc luật`,
            `nếu có vấn đề, ib cho mod hoặc Cat`,
            `ngồi xem mấy con giời xàm lờ`,
            `người ăn cơm tró thường niên`,
            `hãy vui lên vì đời cho phép`,
            `các thành viên Noobs`
        ]
        let i = 0;
        client.setInterval(() => {
            client.user.setActivity(text[i]);
            i == text.length - 1 ? i = 0 : i++;
        }, 15000);
    } catch (e) {
        return require("../../tools/functions/error")(e, undefined)
    }
}
