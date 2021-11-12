const MessageEmbed = require("../../classes/newEmbed")

module.exports = async (client, message) => {
    try {
        if (message.author.bot) return;
        if (message.channel.type == "DM") {
            if (message.author.id == "601204554381656064") {
                const user = await client.users.fetch('762749432658788384');
                user.send(message.content);
            }
        }
        if (message.channel.type == "GUILD_TEXT") {
            let trigger = false;
            const blocklistdomains = require('../../asset/blocklist/domains.json');
            if (message.content.includes('.') && message.content.includes('http')) {
                for(let domain of blocklistdomains){
                    if(!message.content.includes(domain)) return trigger = true;
                }
            }
            if (trigger) {
                message.delete();
                message.reply('**đường link này đã bị chặn!!!**').then(m => m.delete({ timeout: 7000 }))
                const channel = message.guild.channels.cache.get('813765397353725962');
                channel.send({ embeds: [{ title: "Đã chặn được một tên miền!", description: `${message.author.id} | ${message.author.tag}\n\n${message.content.split('://').join('[://]').split('.').join('[.]')}` }] });
            }
            if (message.channel.id == "760946870473457668") {
                if (message.attachments.size > 0) {
                    let data = client.pic.get(message.author.id);
                    if (!data) {
                        client.pic.set(message.author.id, {
                            time: (new Date()).getTime()
                        })
                    } else if (data) {
                        data.time = (new Date()).getTime()
                    }
                }
                if (message.attachments.size == 0) {
                    let data = client.pic.get(message.author.id);
                    if (!data || (new Date()).getTime() - data.time > 10000) {
                        client.pic.delete(message.author.id);
                        message.reply('hãy đính kèm ảnh, nếu muốn post gì đó!').then(m => m.delete({ timeout: 5000 }))
                        message.delete();
                    } else if ((new Date()).getTime() - data.time <= 10000) {
                        client.pic.delete(message.author.id);
                    }
                }
            }
            const date = (new Date()).getTime();
            let guildCache = client.guild;
            if (!guildCache || guildCache.length == 0) {
                guildCache = await require('../../tools/database/getGuild.js')()
            }
            if (client.noImage.includes(message.member.id) && message.attachments && message.attachments.size > 0) {
                message.delete();
            }
            //Adding the exp
            const data = await require('../../tools/database/getLevel')(message.author.id);
            if (data) {
                const addExp = Math.floor(Math.random() * 4) + 4;
                data.exp += addExp;
                data.total++;
                if ((data.exp >= data.level * 400 && data.level > 0) || (data.exp > 400 && data.level == 0)) {
                    data.level++;
                    data.exp = 0;
                    const channel = message.guild.channels.cache.get('801567245351780433');
                    channel.send(`GG ${message.member}\nGà vậy mà vẫn lên level **${data.level}** 😏`);
                }
                await data.save();
            }
            //bot mention
            if (message.mentions.members) {
                if (!message.content.includes("@everyone")) {
                    const users = message.mentions.members.map(m => m.id);
                    if (users.length == 1) {
                        let userCache = client.afk.get(users[0]);
                        if (userCache && userCache.enable == true) {
                            let embed = new MessageEmbed()
                                .setDescription(`<@${users}> AFK - **${userCache.status}**`)
                                .setFooter(`${require("ms")(((new Date()).getTime() - userCache.from), { long: true })} trước`)
                            message.channel.send({embeds: [embed]});
                        }
                    } else if (users.length > 1) {
                        users.forEach(user => {
                            let userCache = client.afk.get(user);
                            if (userCache && userCache.enable == true) {
                                let embed = new MessageEmbed()
                                    .setDescription(`<@${user}> AFK - **${userCache.status}**`)
                                    .setFooter(`${require("ms")(((new Date()).getTime() - userCache.from), { long: true })} trước`)
                                message.channel.send({embeds: [embed]});
                            }
                        })
                    }
                }
            }
            //afk delete
            if (client.afk.get(message.author.id)) {
                let userCache = client.afk.get(message.author.id);
                if (userCache.enable == true) {
                    message.reply("chào mừng bạn quay trở lại!").then(m => m.delete({ timeout: 5000 }));
                    if (userCache.name == true || message.member.displayName.startsWith('[AFK]')) {
                        message.member.setNickname(message.member.displayName.replace('[AFK]', ''))
                    }
                    client.afk.delete(message.author.id);
                    require('../../tools/database/removeAfk')(message.author.id);
                }
            }
            guildCache.prefix = "."
            if (message.content.toLowerCase().startsWith(guildCache.prefix) || message.content.toLowerCase().startsWith(`<@!${client.user.id}>`) || message.content.toLowerCase().startsWith(`<@${client.user.id}>`)) {
                const args = message.content.slice(guildCache.prefix.length).trim().split(/ +/g);
                const cmd = args.shift().toLowerCase();
                const commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
                if (!commandfile) return;
                if(commandfile.config.name == "gai" && message.channel.id != "763147371106271232") return message.reply('xin mời thí chủ vào <#763147371106271232> để test lệnh <:zuataolam:785778089120497724>')
                if (commandfile.config.name == "thathinh" || commandfile.config.name == "gai") {
                    const minus = (date - client.thinh)
                    if (minus < 10000) {
                        message.delete();
                        return message.reply(`bình tĩnh, chờ thêm **${require('ms')(5000 - minus)}** nữa!`).then(m => m.delete({timeout: 5000}));
                    } else if (minus > 10000) {
                        client.thinh = date;
                    }
                }
                if (commandfile.config.category == "leveling" && message.channel.id != "801567245351780433") return message.reply('làm ơn hãy sử dụng command này ở trong <#801567245351780433>');
                if (commandfile.config.category == "voice" && message.channel.id != "801283906074705970") return message.reply('làm ơn hãy sử dụng command này ở trong <#801283906074705970>');
                if(commandfile.config.category == "voice" && !message.member.voice.channel) return message.reply('bạn chỉ có thể sử dụng lệnh này trong một phòng voice (cuộc gọi)')
                if (commandfile.config.perms.includes("BOT_OWNER") && commandfile.config.category == "development" && message.author.id != "762749432658788384") {
                    return;
                } else if (!commandfile.config.perms.includes("BOT_OWNER")) {
                    if (message.channel.permissionsFor(message.member).has(commandfile.config.perms) == false) {
                        return;
                    }
                    if (message.channel.permissionsFor(message.guild.me).has(commandfile.config.bot) == false) {
                        return message.channel.send("Missing permissions.");
                    }
                }
                client.total += 1;
                return commandfile.execute(client, message, args, guildCache)
            }
        }
    } catch (e) {
        require('../../tools/functions/error')(e, message);
    }
}