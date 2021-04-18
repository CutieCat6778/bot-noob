const thinh = require('../../asset/useFullArrays/thathinh.json');
const thinhEn = require('../../asset/useFullArrays/thathinh_en.json');

module.exports = {
    config: {
        name: "thathinh",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['thinh', 'thảthính', 'thính'],
        category: "members",
        usage: ['(-en)']
    },
    async execute(client, message, args, guildCache) {
        try {
            if(message.content.endsWith('-en')){
                const random = Math.floor(Math.random() * thinhEn.length);
                return message.channel.send(thinhEn[random]);
            }
            const random = Math.floor(Math.random() * thinh.length);
            return message.channel.send(thinh[random]);
        } catch (e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
}