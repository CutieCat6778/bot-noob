const MessageEmbed = require("../../classes/newEmbed");

module.exports = {
    config: {
        name: "editsnipe",
        aliases: ["editssnipe", "edits"],
        category: "members",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            let edits = client.edits.get(message.channel.id);
            if (!edits) return message.channel.send("Không có tin nhắn nào đc chỉnh sửa gần đây !");
            if(!args[0]){
                const embed = new MessageEmbed({
                    "title": "Tin nhắn được sửa gần đây!",
                    "description": `${edits.map(a => `**[${edits.indexOf(a) + 1}]** | ${message.guild.members.cache.get(a.author)} | ${require('ms')(client.uptime - a.time, {long: true})} trước`).join('\n')} `,
                    "timestamp": new Date(),
                    "footer": {
                        "text": "được yêu cầu bởi " + message.member.displayName,
                        "icon_url": message.author.displayAvatarURL()
                    }
                })
                return message.channel.send(embed).then(m => m.delete({timeout: 10000}))
            }else if(args[0] && !isNaN(args[0]) && parseInt(args[0])){
                const data = edits[parseInt(args[0] - 1)];
                if(!data) return message.channel.send('không tìm thấy tin nhắn!');
                const embed = new MessageEmbed()
                    .setAuthor(message.guild.members.cache.get(data.author).displayName, message.guild.members.cache.get(data.author).user.displayAvatarURL())
                    .setDescription(`**Trước**\n\xa0\xa0${data.oldContent}\n**Sau**\n\xa0\xa0${data.newContent}${data.attachments ? `\n\n${data.attachments.join('\n')}` : ''}`)
                    .setFooter(`cách đây ${require('ms')(client.uptime, data.time, {long: true})}`)
                if(data.attachments) embed.setImage(data.attachments[0]);
                return message.channel.send(embed);
            }
        } catch (e) {
            return require("../../tools/functions/error")(e, message)
        }
    }
}