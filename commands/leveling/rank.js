const newEmbed = require('../../classes/newEmbed');
const Levels = require('../../models/levels');
module.exports = {
    config: {
        name: "rank",
        aliases: ['level', 'lv'],
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        category: "leveling",
        usage: ['@user']
    },
    async execute(client, message, args, guild) {
        let user = message.member;
        args[0] ? user = message.guild.members.cache.get(require('../../tools/string/mention')(args[0])) : null;
        const data = await require('../../tools/database/getLevel')(user.id);
        let levels = await Levels.find().catch(e => require('../../tools/functions/error')(e, message));
        levels = levels.sort(require('../../tools/functions/sortby')('exp', true, parseInt));
        levels = levels.sort(require('../../tools/functions/sortby')('level', true, parseInt));
        const embed = new newEmbed()
            .setTitle(`Rank ${user.displayName}`)
            .setDescription(`Rank hiện tại của bạn là **${levels.indexOf(levels.find(a => a._id == user.id)) + 1}**\n\n**Tổng tin nhắn** ${data.total}\n**Tổng kinh nghiệm** ${data.exp}\n**Level hiện tại** ${data.level}`)
            .setTimestamp()
            .setThumbnail(user.user.displayAvatarURL())
            .setFooter(`Được yêu cầu bởi ${message.member.displayName}`, message.author.displayAvatarURL())
        return message.channel.send({embeds: [embed]});
    }
}