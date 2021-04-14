const thinh = require('../../asset/useFullArrays/thathinh.json');
const thinhEn = require('../../asset/useFullArrays/thathinh_en.json');

module.exports = {
    config: {
        name: "thathinh",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['thinh'],
        category: "members"
    },
    async execute(client, message, args, guildCache) {
        try {
            const del = (msgID) => {
                client.setTimeout(async() => {
                    message.delete();
                    const msg = await message.channel.messages.fetch(msgID);
                    msg.delete();
                }, 10000)
            }
            if(message.content.endsWith('-en')){
                const random = Math.floor(Math.random() * thinhEn.length);
                const msg = await message.channel.send(thinhEn[random]);
                return del(msg.id);
            }
            const random = Math.floor(Math.random() * thinh.length);
            const msg = await message.channel.send(thinh[random]);
            return del(msg.id);
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}