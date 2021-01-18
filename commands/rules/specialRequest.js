const {
	MessageEmbed
} = require('discord.js');

module.exports = {
	config: {
		name: "specialrequest",
		aliases: ["specreq", "specialreq", "sreq"],
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
				.setTitle("Luật Special Request")
				.setDescription(`**${guild.rules.specialRequest}** \n\n Xin bạn hãy vào lại <#${guild.rules._id}> để có thể biết thêm chi tiết!`)
				.setTimestamp()
				.setFooter('Luật Special Request', message.guild.iconURL())
			return message.channel.send(embed);
		} catch (e) {
			return require("../../tools/functions/error")(e, message)
		}
	}
}