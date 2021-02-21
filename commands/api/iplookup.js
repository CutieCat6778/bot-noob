const MessageEmbed = require('../../classes/newEmbed');
const { lookup } = require('geoip-lite');

module.exports = {
    config: {
        name: "iplookup",
        aliases: ["geoip", "locateip"],
        perms: ['SEND_MESSAGES'],
        bot: ["SEND_MESSAGES"],
        category: 'api'
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, require('../../noArgs/api/iplookup.js')(guildCache.prefix))
            } else if (args[0]) {
                if (require('../../tools/string/validateIP')(args[0])) {
                    const data = await lookup(args[0].toString());
                    if (!data) return message.channel.send("IP andress not found!");
                    const embed = new MessageEmbed()
                        .setColor("#40598F")
                        .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL())
                        .setTimestamp()
                        .setTitle(data.city ? data.city : "Not Found")
                        .setDescription(`X: ${data.range[0]} | Y: ${data.range[1]}`)
                        .addField("Country", data.country ? data.country : "None", true)
                        .addField('Region', data.region ? data.region : "None", true)
                        .addField('Timezone', data.timezone, true)
                    return require('../../tools/function/sendMessage')(message, embed);
                } else return message.channel.send("Invalid IP andress!")
            }
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}