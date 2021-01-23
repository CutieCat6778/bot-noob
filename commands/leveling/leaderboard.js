const newEmbed = require('../../classes/newEmbed');
const Levels = require('../../models/levels');

module.exports = {
    config: {
        name: 'leaderboard',
        aliases: ['lb', 'leadb'],
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        category: "leveling",
        usage: []
    },
    async execute(client, message, args, guild){
        let levels = await Levels.find().catch(e => require('../../tools/functions/error')(e, message));
        levels = levels.sort(require('../../tools/functions/sortby')('total', true, parseInt));
        const embed = new newEmbed()
            .setTitle('Bảng xếp hạng')
            .setTimestamp()
            .setFooter('bảng xếp hạng tương tác', message.guild.iconURL())
            .setThumbnail(message.guild.iconURL())
            .setDescription(`${levels.slice(0, 10).map(a => `**[${levels.indexOf(a) + 1}]** ${message.guild.members.cache.get(a._id)} ➜ [EXP: ${a.exp}, LEVEL: ${a.level}]`).join("\n")}`)
        return message.channel.send(embed);
    }
}