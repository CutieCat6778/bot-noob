const newEmbed = require("../../classes/newEmbed");

module.exports = {
    config: {
        name: "help",
        aliases: ['h', "guide"],
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        usage: [],
        category: "members"
    },
    async execute(client, message, args, guild) {
        if (!args[0]) {
            return message.channel.send({
                embeds: [{
                    "description": "Chào, tớ là Gà - BOT của server Noobs và do <@762749432658788384> tạo ra.\n Prefix của tớ là: **.**",
                    "color": 15246888,
                    "fields": [
                        {
                            "name": "🎳  Entertaiment",
                            "value": "``tod`` ``gai`` ``mock`` ``thinh`` ``dns`` ``ip`` ``ns`` ``search`` ``wiki``"
                        },
                        {
                            "name": "🔧  Utility",
                            "value": "``corona`` ``afk`` ``edits`` ``snipe`` ``remind`` ``avatar`` ``membercount`` ``id``"
                        },
                        {
                            "name": "🏆  Ranking",
                            "value": "``leaderboard`` ``rank``"
                        },
                        {
                            "name": "🏠  Guild",
                            "value": "``help`` ``votekick`` ``attention`` ``form`` ``newmember`` ``rule`` ``specialreq``"
                        },
                        {
                            "name": "👁️‍🗨️ Moderation*",
                            "value": "``thongbao`` ``lock`` ``unlock`` ``prefix`` ``purge`` ``eval``"
                        }
                    ],
                    "author": {
                        "name": "DANH SÁCH LỆNH CỦA GÀ",
                        "icon_url": "https://i.pinimg.com/originals/86/b6/e7/86b6e7b238d2c43ef86e754e312bcd25.jpg"
                    }
                }]
            })
        } else if (args[0]) {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
            if(command){
                const embed = new newEmbed()
                    .setTitle(command.config.name.slice(0, 1).toString().toUpperCase() + command.config.name.slice(1))
                    .addFields([
                        {"name": "Tên của lệnh", "value": command.config.name},
                        {"name": "Viết tắt", "value": command.config.aliases ? command.config.aliases.join(', ') : "Không có"},
                        {"name": "Sử dụng", "value": command.config.usage.lenght > 0 ? `\`${client.guild.prefix}${command.config.name} ${command.config.usage.join(' ')}\`` : `\`${client.guild.prefix}${command.config.name}\``},
                        {"name": "Yêu cầu quyền", "value": `\`\`\`css\n${command.config.perms.map(a => a.toLowerCase().split("_").join(" ")).join('\n')}\n\`\`\``}
                    ])
                command.config.description ? embed.setDescription(command.config.description) : null;
                message.channel.send({embeds: [embed]});
            }
        }
    }
}