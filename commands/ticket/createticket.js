module.exports = {
	config: {
		name: "createticket",
		aliases: ["cretick", "ctick"],
		perms: ['SEND_MESSAGES'],
		bot: ['SEND_MESSAGES'],
		category: "ticket",
		usage: []
	},
	async execute(client, message, args, guild) {
		try {
			let user = client.ticket.get(message.author.id);
			if (!user) {
				client.ticket.set(message.author.id, {
					_id: "",
					done: false
				})
				user = client.ticket.get(message.author.id);
			}
			const channel = await message.guild.channels.create(`${message.member.displayName} support`, {
				type: "text"
			});
			const obj = [{
				id: message.author.id,
				allow: ['VIEW_CHANNEL']
			}, {
				id: message.guild.me.id,
				allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_CHANNELS']
			}, {
				id: message.guild.roles.everyone.id,
				deny: ['VIEW_CHANNEL']
			}]
			if(message.guild.id == "721203266452586507"){
				obj.push({
					id: "763149761225687060",
					deny: ['VIEW_CHANNEL']
				});
				obj.push({
					id: "766059605519892491",
					deny: ['VIEW_CHANNEL']
				});
				obj.push({
					id: "783368099487154176",
					deny: ['VIEW_CHANNEL']
				})
				obj.push({
					id: "802261976587042838",
					allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES']
				})
			}
			await channel.overwritePermissions(obj);
			user._id = channel.id;
			return channel.send(`<@${message.author.id}>, xin bạn hãy chờ cho đến khi một bạn Nhân sự nào đó trả lời.`);
		} catch (e) {
			return require("../../tools/functions/error")(e, message)
		}
	}
}