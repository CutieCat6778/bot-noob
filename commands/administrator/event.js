const MessageEmbed = require("../../classes/newEmbed")
const { readdirSync } = require('fs');

module.exports = {
	config: {
		name: "event",
		aliases: ['sukien', 'sựkiện'],
		perms: ['MANAGE_GUILD'],
		bot: ['SEND_MESSAGES'],
		category: 'administrator',
		usage: ['text'],
		author: true,
	},
	async execute(client, message, args, guild) {
		try {
			const option = args[0];

			const avaible = await readdirSync('./_event/');
			if(!avaible.includes(option)) return message.channel.send("Những option là **`" + avaible.join('`**, **`') + "**\`");

			message.delete();

			const Class = require('../../_event/'+option+'/index.js')

			console.log(Class);

			const Event = new Class(client, message);

			Event.start();
		} catch (e) {
			return require("../../tools/functions/error")(e, message)
		}
	}
}