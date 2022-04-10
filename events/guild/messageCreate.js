const { Permissions } = require("discord.js");
const MessageEmbed = require("../../classes/newEmbed");
const newRoom = require("../../tools/database/newRoom");

module.exports = async (client, message) => {
    try {
        if (message.author.bot) return;
        if (message.channel.type == "DM") {
            if (message.author.id == "601204554381656064") {
                const user = await client.users.fetch('924351368897106061');
                user.send(message.content);
            }
        }
        if (message.channel.type == "GUILD_TEXT") {
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
                        await message.channel.send('hãy đính kèm ảnh, nếu muốn post gì đó!').then(m => m.delete({ timeout: 5000 }))
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
                data.messages.message.push(message.createdAt);
                if (message.content.startsWith('http')) {
                    data.messages.links.push(message.createdAt);
                }
                if (message.content.startsWith('.')) {
                    data.messages.bot.push(message.createdAt);
                }
                if (message.stickers.size > 0) {
                    data.messages.stickers.push(message.createdAt);
                }
                if (message.content.includes('<:') && message.content.includes(":>")) {
                    data.messages.emojis.push(message.createdAt);
                }
                if (message.mentions?.member?.size > 0) {
                    const data = [];
                    message.mentions.members.forEach(async member => {
                        const userData = data.message.mentions.find(a => a._id === member.id);
                        if (userData) {
                            userData.times.push(message.createdAt);
                        } else {
                            userData.push({
                                _id: member.id,
                                times: [message.createdAt]
                            })
                        }
                        const userDataCloud = await require('../../tools/database/getLevel')(member.id);
                        if (userDataCloud) userDataCloud.messages.mentionsBy.push(message.createdAt);
                    })
                }
                const channelData = data?.channels?.find(a => a._id == message.channel.id);
                if (channelData) {
                    channelData.times.push(message.createdAt);
                } else {
                    data.channels.push({
                        _id: message.channel.id,
                        times: [message.createdAt]
                    })
                }
                const addExp = Math.floor(Math.random() * 4) + 4;
                data.exp += addExp;
                data.total++;
                if ((data.exp >= data.level * 400 && data.level > 0) || (data.exp > 400 && data.level == 0)) {
                    data.level++;
                    data.exp -= data.level * 400;
                    const channel = message.guild.channels.cache.get('801567245351780433');
                    channel.send(`GG ${message.member}\nGà vậy mà vẫn lên level **${data.level}** 😏`);
                }
                if (data.exp < 0) data.exp = 0;
                if (data.level < 0) data.level = 0;
                if(data.exp === 0 && data.level <= 0 && data.total != 0) {
                    data.exp = data.total * addExp;
                } 
                if (new Date(data.updates[(data.updates.length) - 1]).getDate() != new Date().getDate()) data.updates.push(message.createdAt);
                await data.updateOne(data, (err, result) => {
                    if(err) throw err;
                })
            }
            //bot mention
            if (message.mentions.members) {
                if(message.mentions.members.has(client.user.id)) return message.reply("Gọi bố gì đấy <:Huy:791140987070054420>")
                if (!message.content.includes("@everyone")) {
                    const users = message.mentions.members.map(m => m.id);
                    if (users.length == 1) {
                        let userCache = client.afk.get(users[0]);
                        if (userCache && userCache.enable == true) {
                            let embed = new MessageEmbed()
                                .setDescription(`<@${users}> AFK - **${userCache.status}**`)
                                .setFooter(`${require("ms")(((new Date()).getTime() - userCache.from), { long: true })} trước`)
                            message.channel.send({ embeds: [embed] });
                        }
                    } else if (users.length > 1) {
                        users.forEach(user => {
                            let userCache = client.afk.get(user);
                            if (userCache && userCache.enable == true) {
                                let embed = new MessageEmbed()
                                    .setDescription(`<@${user}> AFK - **${userCache.status}**`)
                                    .setFooter(`${require("ms")(((new Date()).getTime() - userCache.from), { long: true })} trước`)
                                message.channel.send({ embeds: [embed] });
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
                if(commandfile.disable == true) return message.reply('Lệnh này đã được block vì lý do an toàn (lỗi), nếu bạn muốn dùng lại lệnh này thì hãy liên hệ <@924351368897106061> để được fix sớm nhất nhé :>')
                if (commandfile.config.name == "thathinh" || commandfile.config.name == "gai") {
                    const minus = (date - client.thinh)
                    if (minus < 10000) {
                        message.delete();
                        const m = await message.reply(`bình tĩnh, chờ thêm **${require('ms')(10000 - minus)}** nữa!`);
                        setTimeout(() => {
                            m.delete();
                        }, 7000);
                        return 0;
                    } else if (minus > 10000) {
                        client.thinh = date;
                    }
                }
                if(commandfile.config.author && process.env.LOCAL != "true") return;
                if (commandfile.config.category == "leveling" && message.channel.id != "801567245351780433") return message.reply('làm ơn hãy sử dụng command này ở trong <#801567245351780433>');
                if (commandfile.config.category == "voice" && message.channel.id != "801283906074705970") return message.reply('làm ơn hãy sử dụng command này ở trong <#801283906074705970>');
                if (commandfile.config.category == "voice" && !message.member.voice.channel) return message.reply('bạn chỉ có thể sử dụng lệnh này trong một phòng voice (cuộc gọi)')
                if (commandfile.config.category == "voice" && message.member.voice.channel && message.member.voice.channel.parent.id == "800139706250559518") {
                    let voiceCache = client.voices.get(message.member.voice.channel.id);
                    if (!voiceCache) {
                        const obj = {
                            owner: message.author.id,
                            allow: [],
                            deny: [],
                            lock: false,
                            sleep: false,
                            defend: [],
                            mute: [],
                        }
                        client.voices.set(obj);
                        newRoom({ _id: message.member.voice.channel.id, owner: message.member.id })
                    }
                }
                if(!commandfile.config.author && !message.author.id === "924351368897106061"){
                    if (commandfile.config.perms.includes("BOT_OWNER") && commandfile.config.category == "development" && message.author.id != "924351368897106061") {
                        return;
                    } else if (!commandfile.config.perms.includes("BOT_OWNER")) {
                        if (message.channel.permissionsFor(message.member).has(commandfile.config.perms.map(a => Permissions.FLAGS[a])) == false) {
                            return;
                        }
                        if (message.channel.permissionsFor(message.guild.me).has(commandfile.config.perms.map(a => Permissions.FLAGS[a])) == false) {
                            return message.channel.send("Missing permissions.");
                        }
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
