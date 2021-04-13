const thinh = require('../../asset/useFullArrays/thathinh.json');

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
            const random = Math.floor(Math.random() * thinh.length);
            message.channel.send(thinh[random]);
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}