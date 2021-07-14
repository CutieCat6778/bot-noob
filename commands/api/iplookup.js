const MessageEmbed = require('../../classes/newEmbed');
const fetch = require('node-fetch');

module.exports = {
    config: {
        name: "iplookup",
        aliases: ["ip", "locateip"],
        perms: ['SEND_MESSAGES'],
        bot: ["SEND_MESSAGES"],
        category: 'api',
        usage: ['[ip_andress]']
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return ;
            } else if (args[0]) {
                if (require('../../tools/string/validateIP')(args[0])) {
                    const embed1 = new MessageEmbed()
                        .setDescription('**Please wait . . . **')
                    const msg = await message.channel.send(embed1);
                    const ip = args[0].toString();
                    fetch(`http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,reverse,query`)
                        .then(a => a.json())
                        .then(res => {
                            if (res.status != 'success') {
                                return msg.edit({ embed: { description: `**STATUS**\xa0\xa0\xa0\xa0\`${res.message}\`` } })
                            } else if (res.status == 'success') {
                                const embed = new MessageEmbed()
                                    .setTitle(`${res?.query}`)
                                    .setDescription(`x: ${res?.lat} | y: ${res?.lon}`)
                                    .addFields([
                                        { "name": `Continent`, "value": `${res?.continent} | ${res?.continentCode}` },
                                        { "name": `Country`, "value": `${res?.country} | ${res?.countryCode}` },
                                        { "name": "Region", "value": `${res?.regionName} | ${res?.region}` },
                                        { "name": "City", "value": res.city },
                                        { "name": "ZIP code", "value": res?.zip },
                                        { "name": "Timezone", "value": res.timezone },
                                        { "name": "DNS", "value": res?.reverse },
                                        { "name": "ISP", "value": res?.isp },
                                        { "name": "Organization", "value": `${res?.org} | ${res?.as}` },
                                    ])
                                    .setTimestamp()
                                    .setFooter('API by ip-api.com', message.guild.me.user.displayAvatarURL())
                                client.setTimeout(() => {
                                    msg.edit(embed)
                                }, 3000)
                            }
                        })
                        .catch(e => require('../../tools/functions/error')(e, message))
                } else return message.channel.send("Invalid IP andress!")
            }
        } catch (e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
}