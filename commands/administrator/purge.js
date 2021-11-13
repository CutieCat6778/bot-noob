module.exports = {
	config: {
		name: "purge",
		aliases: ["xoa", "xóa", "delete", "clear"],
		perms: ["MANAGE_MESSAGES"],
		bot: ["MANAGE_MESSAGES"],
		category: "administrator",
		usage: ['[lines]']
	},
	async execute(client, message, args, guild) {
		try {
			if (!args[0]) return message.channel.send("Xin hãy cho một số từ 1 đến 80");
			if (args[0].toLowerCase() == "max") args[0] = 80;
			if (isNaN(parseInt(args[0])) == true && args[0] != "max") return message.channel.send("Số dòng không hợp lệ");
			if (parseInt(args[0]) < 1 || parseInt(args[0]) > 80) return message.channel.send("Tôi chỉ có thể xóa max là 80 dòng.");
			let reason = args.slice(1).join(" ");
			if (!args[1]) reason = "No reason provided";
			message.channel.bulkDelete(args[0], true)
				.then((m) => {
					message.channel.send(`Deleted ${m.size} messages`).then(m => {
						m.delete({
							timeout: 5000,
							reason: reason
						});
					})
				}).catch(e => {
					return require("../../tools/functions/error")(e, message)
				})
		} catch (e) {
			return require("../../tools/functions/error")(e, message)
		}
	}
}