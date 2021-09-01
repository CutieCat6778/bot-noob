const MessageEmbed = require("../../classes/newEmbed")

module.exports = {
	config: {
		name: "thongbao",
		aliases: ['thongb', 'thbao'],
		perms: ['MANAGE_GUILD'],
		bot: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
		category: 'administrator',
		usage: ['text']
	},
	async execute(client, message, args, guild) {
		try {
			const text = args.slice(0).join(" ");
			const embed = new MessageEmbed()
				.setTitle('📢 Thông báo 📢')
				.setDescription(`${text}`)
				.setTimestamp()
				.setFooter('Thông báo quan trọng')
			message.delete();
			message.guild.channels.cache.get("762078655136399400").send({embeds: [embed]});
		} catch (e) {
			return require("../../tools/functions/error")(e, message)
		}
	}
}