const MessageEmbed = require('../../classes/newEmbed');

module.exports = {
	config: {
		name: "attention",
		aliases: ["lưuý", "luuy", "atten"],
		perms: ["SEND_MESSAGES"],
		bot: ["SEND_MESSAGES"],
		usage: ['[@user]'],
		category: 'rules'
	},
	async execute(client, message, args, guild) {
		try {
			const id = require('../../tools/string/mention')(args[0]);
			if (id) {
				message.channel.send(`<@${id}>`);
				message.delete();
			}
			const embed = new MessageEmbed()
				.setTitle("Lưu ý!")
				.setDescription(`**${guild.rules.attention}** \n\n Xin bạn hãy vào lại <#${guild.rules._id}> để có thể biết thêm chi tiết!`)
				.setTimestamp()
				.setFooter('Lưu ý', message.guild.iconURL())
			return message.channel.send({embeds: [embed]});
		} catch (e) {
			return require("../../tools/functions/error")(e, message)
		}
	}
}