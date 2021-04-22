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
            const randomize = (length) => {
                return Math.floor(Math.random() * length);
            }
            if(message.content.endsWith('-en')){
                let random = randomize(thinhEn.length);
                const run = () => {
                    client.thinhUsedEn.includes(random) ? run() : client.thinhUsedEn.push(random);
                }
                run();
                return message.channel.send(thinhEn[random]);
            }
            let random = randomize(thinh.length);
            const run = () => {
                client.thinhUsed.includes(random) ? run() : client.thinhUsed.push(random);
            }
            run();
            return message.channel.send(thinh[random]);
        } catch (e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
}