module.exports = {
    config: {
        name: 'cleanup',
        aliases: ["selfpurge", "selfclear"],
        perms: ["BOT_OWNER"],
        category: "development"
    },
    async execute(client, message, args, guildCache) {
        try {
            args[0] ? args[0] : args[0] = "80";
            message.channel.messages.fetch({
                limit: parseInt(args[0]),
            }).then(async (messages) => {
                messages = messages.filter(m => m.author.id === client.user.id).array().slice(0, parseInt(args[0]));
                message.channel.bulkDelete(messages)
                    .then((m) => {
                        message.reply(`Deleted ${m.size} messages`).then(m => {
                            m.delete({ timeout: 5000 });
                        })
                    }).catch(e => {
                        return require("../../tools/functions/error")(e, message)
                    })
            });
        } catch (e) {
            return require('../../tools/functions/error')(e, message);
        }

    }
}