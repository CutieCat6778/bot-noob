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
		try{
		return message.channel.send({embeds: [{
			description: `Tổng số người: **${message.guild.members.cache.size}**`
		}]})
		}catch (e) {
            return require("../../tools/functions/error")(e, message)
        }
	}
}