const MessageEmbed = require('../../classes/newEmbed');

module.exports = async(client, message) => {
	try{
		if(message.author.bot) return;
		if(message.channel.type == "text") {
			let guildCache = client.guild;
			if(!guildCache || guildCache.length == 0){
				guildCache = await require('../../tools/database/getGuild.js')()
            }
            //Adding the exp
            const data = await require('../../tools/database/getLevel')(message.author.id);
            if(data){
                const addExp = Math.floor(Math.random() * 4) + 4;
                data.exp += addExp;
                data.total++;
                if(data.exp >= data.level * 400 || (data.exp > 400 && data.level == 0)){
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
                            message.channel.send(embed);
                        }
                    } else if (users.length > 1) {
                        users.forEach(user => {
                            let userCache = client.afk.get(user);
                            if (userCache && userCache.enable == true) {
                                let embed = new MessageEmbed()
                                    .setDescription(`<@${user}> AFK - **${userCache.status}**`)
                                    .setFooter(`${require("ms")(((new Date()).getTime() - userCache.from), { long: true })} trước`)
                                message.channel.send(embed);
                            }
                        })
                    }
                }
            }
            //afk delete
            if (client.afk.get(message.author.id)) {
                let userCache = client.afk.get(message.author.id);
                if (userCache.enable == true) {
                    message.reply("chào mừng bạn quay trở lại!").then(m => m.delete({timeout: 5000}));
                    if(userCache.name == true || message.member.displayName.startsWith('[AFK]')){
                        message.member.setNickname(message.member.displayName.replace('[AFK]', ''))
                    }
                    client.afk.delete(message.author.id);
                    require('../../tools/database/removeAfk')(message.author.id);
                }
            }
			if (message.content.toLowerCase().startsWith(guildCache.prefix) || message.content.toLowerCase().startsWith(`<@!${client.user.id}>`) || message.content.toLowerCase().startsWith(`<@${client.user.id}>`)) {
                const args = message.content.slice(guildCache.prefix.length).trim().split(/ +/g);
                const cmd = args.shift().toLowerCase();
                const commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
                if(!commandfile) return;
                if(commandfile.config.category == "leveling" && message.channel.id != "801567245351780433") return;
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
	}catch(e){
		require('../../tools/functions/error')(e, message);
	}
}