module.exports = {
	config: {
		name: "prefix",
		aliases: ['changeprefix'],
		category: "administrator",
		perms: ['MANAGE_GUILD'],
		bot: ['SEND_MESSAGES'],
		usage: ['[new-prefix]']
	},
	async execute(client, message, args, guild) {
		try {
			const new_prefix = args[0];
			guild.prefix = new_prefix;
			const guildData = await require('../../tools/database/getGuild')();
			guildData.prefix = new_prefix;
			guildData.save();
			return message.channel.send(`Đã đổi prefix thành \`${new_prefix}\``);
		} catch (e) {
			return require("../../tools/functions/error")(e, message)
		}
	}
}