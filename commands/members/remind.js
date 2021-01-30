module.exports = {
	config: {
		name: "remind",
		aliases: ['alert', 'reminder', 'baothuc'],
		perms: ['SEND_MESSAGES'],
		bot: ["SEND_MESSAGES"],
		category: 'members',
		usage: ["time(10s, 10m, 10d)", "text"]
	},
	async execute(client, message, args, guild) {
		try{
			if(!args[0]) return message.channel.send('Bạn hãy cho một thời gian (10s, 10min, 10d, 10week)');
			if(!args[1]) return message.channel.send('Bạn hãy cho một cái text!');
			const time = require('../../tools/functions/timeFormatter')(args[0]);
			if(!time) return message.channel.send("Thời gian không hợp lệ!");
			else if(time){
				function f() {
					if(author){
						author.send({embed: {
							description: `**${args.slice(1).join(" ")}**`
						}})
					}
				}
				require('../../tools/database/newTimeout')({
					id: message.author.id,
					from: (new Date()).getTime(),
					to: (new Date()).getTime() + time,
					function: f.toString(),
					args: args
				});
				client.setTimeout(f, time);
				return message.channel.send('Okê bạn êy.')
			}
		}catch (e) {
            return require("../../tools/functions/error")(e, message)
        }
	}
}