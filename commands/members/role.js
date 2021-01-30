const MessageEmbed = require('../../classes/newEmbed');

module.exports = {
	config: {
		name: "role",
		aliases: ['roleinfo', 'ri'],
		category: "members",
		perms: ['SEND_MESSAGES'],
		bot: ['SEND_MESSAGES'],
		usage: ['@role']
	},
	async execute(client, message, args, guild) {
		try{
			if(!args[0]) return message.channel.send('Xin bạn hãy mention hoặc ping một role');
			else if(args[0]){
				const id = require('../../tools/string/mention')(args[0]);
				const role = message.guild.roles.cache.get(id);
				const roleCache = guild.rules.roles.find(r => r._id == id);
				if(!role || !roleCache) return message.channel.send('Không thể tìm thấy role');
				else if(role){
					const embed = new MessageEmbed()
						.setTitle(`${role.name ? role.name : `Không biết`}`)
						.setFooter(`Được yêu cầu bởi ${message.member.displayName}`, message.author.displayAvatarURL())
						.addField('Màu role', role.hexColor, true)
						.addField('Bậc', role.position, true)
						.addField('Nhìn thấy được', role.hoist == true ? `có` : `không`, true)
						.addField('Có thể ping được', role.mentionable== true ? `có` : `không`, true)
					if(roleCache.age){
						embed.addField(`Độ tuổi`, roleCache.age > 17 ? `trên 18 tuổi` : `dưới 18 tuổi`, true)
					}
					if(roleCache.users){
						embed.setDescription(`Những người sở hữu **${roleCache.users.map(r => `${message.guild.members.cache.get(r._id).displayName} [${r.sex == true ? `trai` : `gái`}]`).join('**, **')}**`)
					}
					return message.channel.send(embed.addField('Được tạo vào', role.createdAt.toLocaleString()))
				}
			}
		}catch (e) {
            return require("../../tools/functions/error")(e, message)
        }
	}
}