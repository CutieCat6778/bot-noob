const MessageEmbed = require('../../classes/newEmbed');
const fetch = require('node-fetch');

module.exports = {
    config: {
        name: "dnslookup",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['dns', 'dnslookup'],
        category: 'api',
        usage: ['[domain_name]']
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return ;
            } else if (args[0]) {
                const validator = require('../../tools/string/domainValidation');
                if (validator(args[0].toString())) {
                    const embed1 = new MessageEmbed()
                        .setDescription('**Please wait . . . **')
                    const msg = await message.channel.send(embed1);
                    const query = args[0].toString();
                    const key = "QF9KcsSbhWRadkdHVND28HuF1l6eYVGx";
                    const opt = {
                        method: 'GET',
                        redirect: 'follow',
                        headers: {
                            "apikey": key
                        }
                    };
                    const url = `https://api.promptapi.com/dns_lookup/api/a/${query}`
                    fetch(url, opt)
                        .then(a => a.json())
                        .then(res => {
                            if (res.message || res.error) {
                                return msg.edit({ embed: { description: `**STATUS**\xa0\xa0\xa0\xa0\`${res.message || res.error}\`` } });
                            } else if (!res.message) {
                                const embed = new MessageEmbed()
                                    .setDescription(`${res?.results?.map(a => `${a.ipAddress}`)?.join('\n')}`)
                                return msg.edit(embed);
                            }
                        })
                        .catch(e => require('../../tools/functions/error')(e, message))
                }
            }
        } catch (e) {
            return require('../../tools/functions/error')(e, message)
        }
    }
}