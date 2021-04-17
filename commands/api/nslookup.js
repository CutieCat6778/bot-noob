const MessageEmbed = require('../../classes/newEmbed');
const fetch = require('node-fetch');

module.exports = {
    config: {
        name: "nslookup",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['ns', 'nameserver'],
        category: 'api'
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
                    const key = "fb3618a3d82246f3d05feef22893556c176bac03";
                    const url = `https://endpoint.apivoid.com/dnslookup/v1/pay-as-you-go/?key=${key}&action=dns-ns&host=${query}`
                    fetch(url)
                        .then(a => a.json())
                        .then(res => {
                            if (!res.success) {
                                return msg.edit('Unable to look for the domain up!');
                            } else if (res.success) {
                                const embed = new MessageEmbed()
                                    .setTitle(query)
                                    .setDescription(`${res?.data?.records?.items?.map(a => `Host: **${a.host}** \xa0\xa0\xa0\xa0\xa0\xa0 Target: **${a.target}**`)?.join('\n')}`)
                                    .setTimestamp()
                                    .setFooter('API by apivoid.com', message.guild.me.user.displayAvatarURL())
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