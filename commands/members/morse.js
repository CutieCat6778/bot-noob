const morse = require('morse');

module.exports = {
    config: {
        name: "morse",
        aliases: ['morsecode', 'mrose'],
        category: 'chat',
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return message.channel.send('Bạn hãy cho tôi một cái Text gì đó!')
            } else if (args[0]) {
                const text = args.slice(0)
                if (text.length > 7) return message.channel.send("Text của bạn quá dài, tối đa là 7 chữ!");
                else if (text.length <= 7) {
                    const encoded = morse.encode(text);
                    return message.channel.send(`\`${encoded.join("    ")}\``)
                }
            }
        } catch (e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
}