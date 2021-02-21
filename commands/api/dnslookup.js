const lookup = require('dns-lookup');

module.exports = {
    config: {
        name: 'dnslookup',
        aliases: ['nameserver', 'dnssearch'],
        category: 'api',
        perms: ["SEND_MESSAGES"],
        bot: ['SEND_MESSAGES']
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage.js')(message, require('../../noArgs/api/dnslookup.js')(guildCache.prefix));
            } else if (args[0]) {
                if (require('../../tools/string/domainValidation')(args[0])) {
                    lookup(args[0], (err, andress, family) => {
                        if (err) throw err;
                        return require('../../tools/function/sendMessage')(message, andress, true);
                    })
                } else return message.channel.send("Invalid domain name!");
            }
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}