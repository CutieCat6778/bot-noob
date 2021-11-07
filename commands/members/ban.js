module.exports = {
	config: {
		name: "ban",
		aliases: ['bann', 'ben'],
		perms: ['SEND_MESSAGES'],
		bot: ["SEND_MESSAGES"],
		category: 'members',
		usage: ["@user", "lý do"]
	},
	async execute(client, message, args, guild) {
		try{
			return message.reply('ban con cek, bố éo có quyền .l.')
		}catch (e) {
            return require("../../tools/functions/error")(e, message)
        }
	}
}
