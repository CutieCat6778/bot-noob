const MessageEmbed = require('../../classes/newEmbed');

module.exports = {
	config: {
		name: "thongbao",
		aliases: ['sukien', 'sựkiện'],
		perms: ['MANAGE_GUILD'],
		bot: ['SEND_MESSAGES'],
		category: 'administrator',
		usage: ['text']
	},
	async execute(client, message, args, guild) {
		try {
			const text = args.slice(0).join(" ");
			const embed = new MessageEmbed()
				.setTitle('📢 Sự kiện 📢')
				.setDescription(`**-** ${text}`)
				.setTimestamp()
				.setFooter('Sự kiện quan trọng')
			message.delete();
			message.channel.send({embeds: [embed]});
		} catch (e) {
			return require("../../tools/functions/error")(e, message)
		}
	}
}