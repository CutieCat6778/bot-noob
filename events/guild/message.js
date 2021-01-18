const {MessageEmbed} = require('discord.js');

module.exports = async(client, message) => {
	try{
		if(message.author.bot) return;
		if(message.channel.type == "text") {
			let guildCache = client.guild;
			if(!guildCache || guildCache.length == 0){
				guildCache = await require('../../tools/database/getGuild.js')()
			}
			if (message.content.toLowerCase().startsWith(guildCache.prefix) || message.content.toLowerCase().startsWith(`<@!${client.user.id}>`) || message.content.toLowerCase().startsWith(`<@${client.user.id}>`)) {
                const args = message.content.slice(guildCache.prefix.length).trim().split(/ +/g);
                const cmd = args.shift().toLowerCase();
                const commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
                if(!commandfile) return;
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