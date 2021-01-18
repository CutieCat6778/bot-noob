module.exports = {
	config: {
		name: "createticket",
		aliases: ["cretick", "ctick"],
		perms: ['SEND_MESSAGES'],
		bot: ['SEND_MESSAGES'],
		category: "ticket",
		usage: []
	},
	async execute(client, message, args, guild){
		let user = client.ticket.get(message.author.id);
		if(!user){
			client.ticket.set(message.author.id, {
				_id: "",
				done: false
			})
			user = client.ticket.get(message.author.id);
		}
		const channel = await message.guild.channels.create(`${message.member.displayName} support`, {type: "text"});
        await channel.overwritePermissions([
        	{
        		id: message.author.id,
        		allow: ['VIEW_CHANNEL']
        	},
        	{
        		id: message.guild.me.id,
        		allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_CHANNELS']
        	},
        	{
        		id: message.guild.roles.everyone.id,
        		deny: ['VIEW_CHANNEL']
        	},
        	{
        		id: "763149761225687060",
        		deny: ['VIEW_CHANNEL']
        	},
        	{
        		id: "766059605519892491",
        		deny: ['VIEW_CHANNEL']
        	},
        	{
        		id: "783368099487154176",
        		deny: ['VIEW_CHANNEL']
        	}
        ]);
        user._id = channel.id;
        console.log(user);
        return channel.send(`<@${message.author.id}>, xin bạn hãy chờ cho đến khi một bạn Nhân sự nào đó trả lời.`);
	}
}