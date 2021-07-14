module.exports = {
    config: {
        name: "myid",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        category: "members",
        usage: ['@user'],
        aliases: ['getid', 'id']
    },
    async execute(client, message, args, guild) {
        try {
            if (!args[0]) {
                return message.channel.send(message.author.id);
            } else if (args[0]) {
                return message.channel.send(require('mention-converter')(args[0]))
            }
        } catch (e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
}