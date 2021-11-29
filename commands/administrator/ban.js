const MessageEmbed = require("../../classes/newEmbed")

module.exports = {
	config: {
		name: "ban",
		aliases: ['cấm', 'cút'],
		perms: ['MANAGE_GUILD'],
		bot: ['SEND_MESSAGES'],
		category: 'administrator',
		usage: ['text']
	},
	async execute(client, message, args, guild) {
		try {
			if(!args[0]) return;
      if(args[1]){
        for(const arg of args) {
          message.guild.members.ban(arg, {reason: `Được ban bởi ${message.member.displayName}`});
        }
        return message.reply(`Đã ban: **\`${args.join('\`**, **\`')}\`**`);
      }else if(!args[1]){
        message.guild.members.ban(args[0], {reason: `Được ban bởi ${message.member.displayName}`});
        return message.reply(`Đã ban: **\`${args.join('\`**, **\`')}\`**`);
      }
		} catch (e) {
			return require("../../tools/functions/error")(e, message)
		}
	}
}