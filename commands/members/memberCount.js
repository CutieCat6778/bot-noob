module.exports = {
	config: {
		name: 'membercount',
		aliases: ['songuoi', 'sốngười'],
		category: 'members',
		perms: ['SEND_MESSAGES'],
		bot: ["SEND_MESSAGES"],
		usage: []
	},
	async execute(client, message, args, guild){
		return message.channel.send({embed: {
			description: `Tổng số người: **${message.guild.members.cache.size}**`
		}})
	}
}