module.exports = {
	config: {
		name: "closeticket",
		aliases: ['closet', 'clticket'],
		perms: ['MANAGE_GUILD'],
		bot: ['MANAGE_CHANNELS'],
		usage: ['@user'],
		category: "ticket"
	},
	async execute(client, message, args, guild) {
		const id = require('../../tools/string/mention')(args[0]);
		const ticket = client.ticket.get(id);
		const user = message.guild.members.cache.get(id);
		if(!user || !ticket) return message.channel.send("Không tìm thấy Ticket!");
		ticket.done = true;
		user.send('Câu hỏi của bạn đã được trả lời! Bạn nhân sự đã đóng Ticket của bạn.');
		const channel = await message.guild.channels.cache.get(ticket._id);
		channel.delete('Câu hỏi đã được trả lời, cho nên xóa channel này');
		return message.channel.send('Đã đóng Ticket!');
	}
}