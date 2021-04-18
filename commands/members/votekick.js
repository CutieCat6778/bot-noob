const MessageEmbed = require("../../classes/newEmbed");

module.exports = {
    config: {
        name: 'votekick',
        aliases: ["votek", "vkick"],
        category: "moderation",
        perms: ["SEND_MESSAGES"],
        description: "Mọi người có thể dùng command để có thể vote và kick một ai đó!",
        bot: ["ADD_REACTIONS", "EMBED_LINKS"],
        usage: ['@user', 'reason']
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                return message.channel.send('Xin bạn hãy mention một ai đó mà bạn muốn kick.')
            }
            const target = message.guild.members.cache.get(require('mention-converter')(args[0]));
            if (!target) return message.channel.send("Không tìm thấy người dùng");
            let reason = args.slice(1).join(" ");
            if (!reason || !target) {
                return message.channel.send('Xin bạn hãy mention một ai đó và một cái lý do')
            }
            if (message.member.id == target.id) return message.channel.send("Bạn không thể votekick chính mình");
            let embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`${message.member.displayName} đã votekick ${target.displayName}`)
                .setDescription(`**__Lý do:__**\n\t\t\t\t**${reason.toString()}**\n\nNếu mà có nhiều người đồng ý kick, thì cái người đó sẽ bị kick khỏi server\n✅ để đồng ý kick\n❌ để không đồng ý kick\n🗑️ nếu mà có hơn 5 người vote cái này, thì cái vote sẽ bị đóng lại.`)
                .setTimestamp()
                .setThumbnail(target.user.displayAvatarURL())
                .setFooter("Vote sẽ được đóng lại trong 15 phút")
            message.channel.send(embed).then(async m => {
                m.react("✅");
                m.react("❌");
                await m.react("🗑️");
                let posiv = 0;
                let nega = 0;
                let del = 0;
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '✅' || reaction.emoji.name === '❌' || reaction.emoji.name === '🗑️';
                };
                const collector = m.createReactionCollector(filter, { time: 900000 });
                collector.on('collect', (reaction, user) => {
                    if(user.id == "699483674202079254" || user.id == "763952135095582757") return;
                    if (reaction.emoji.name == "✅") posiv++;
                    if (reaction.emoji.name == "❌") nega++;
                    if (reaction.emoji.name == "🗑️") {
                        user = message.guild.members.cache.get(user.id);
                        del++;
                        if (del > 5) {
                            let embed = new MessageEmbed()
                                .setColor("#40598F")
                                .setTitle("Vote đã kết thúc")
                                .setDescription("Có hơn 5 người đã đồng ý để đóng vote.")
                                .setTimestamp()
                                .setThumbnail(target.user.displayAvatarURL())
                            collector.stop();
                            return m.edit(embed);
                        }
                        if (!user.permissions.has("ADMINISTRATOR")) return;
                        else if (user.permissions.has("ADMINISTRATOR")) {
                            collector.stop();
                            m.delete();
                        }
                    }
                });
                collector.on('end', async collected => {
                    let embed = new MessageEmbed()
                        .setColor("#40598F")
                        .setTitle(`${target.displayName} votekick`)
                        .setTimestamp()
                        .setThumbnail(target.user.displayAvatarURL())
                    if (posiv > nega) {
                        if (target.roles.highest.position >= message.guild.me.roles.highest.position && target.permissions.has("ADMINISTRATOR")) {
                            return m.edit(embed.setDescription(`<@!${target.id}> is guilty, with ${posiv} votes. Please mentions a Moderator or Admin to kick the user, I don't have permission to kick him/her.`))
                        } else if (target.roles.highest.position < message.guild.me.roles.highest.position && !target.permissions.has("ADMINISTRATOR")) {
                            await target.kick({ reason: reason });
                            m.edit(embed.setDescription(`Đã kick ${target.displayName} với ${posiv} vote đồng ý.`))
                        }
                    } else if (posiv < nega) {
                        m.edit(embed.setDescription(`<@!${target.id}> không có tội, có ${nega} vote không đồng ý`))
                    } else {
                        m.edit(embed.setDescription(`Tôi không thể quyệt định được có kick <@!${target.id}>, tại vì số vote bằng nhau.`))
                    }
                });
            })
        } catch (e) {
            return require("../../tools/functions/error")(e, message)
        }
    }
}