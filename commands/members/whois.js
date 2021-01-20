const MessageEmbed = require('../../classes/newEmbed');

module.exports = {
	config: {
		name: "whois",
		aliases: ['aila', 'ui'],
		category: "members",
		perms: ["SEND_MESSAGES"],
		bot: ["SEND_MESSAGES"],
		usage: ['@user']
	},
	async execute(client, message, args, guild) {
		try {
			let target;
			args[0] ? target = message.guild.members.cache.get(require('../../tools/string/mention.js')(args[0])) : target = message.member;
			if (!target) return message.channel.send('Không tìm thấy người dùng!');
			const user = await require('../../tools/database/getUser.js')(target.id);
			const year = require('../../tools/string/yearConverter.js')(user.birthday.year);
			const embed = new MessageEmbed()
				.setTitle(`${target.user.tag}`)
				.setThumbnail(target.user.displayAvatarURL())
				.addField("Tên thật", user.realName ? user.realName : "Không biết", true)
				.addField("ID", target.id, true)
				.addField("Tag", target.user.discriminator, true)
				.addField('Sinh nhật', user.birthday.day != 0 ? `${user.birthday.day < 10 ? `0${user.birthday.day}` : user.birthday.day}/${user.birthday.month < 10 ? `0${user.birthday.month}` : user.birthday.month}` : "Không biết", true)
				.addField('Năm sinh', year != 0 ? year : "Không biết", true)
				.addField("Đang ở", user.location ? user.location : "Không biết", true)
				.setFooter(`Được yêu cầu bởi ${message.author.username}`, message.author.displayAvatarURL())
			return message.channel.send(embed);
		} catch (e) {
			return require("../../tools/functions/error")(e, message)
		}
		
	}
}