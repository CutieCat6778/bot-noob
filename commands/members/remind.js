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
			const time = require('../../tools/functions/timeFormatter')(args[0]);
			if(!time) return message.channel.send("Thời gian không hợp lệ!");
			else if(time){
				function f() {
					const author = client.users.cache.get(message.author.id);
					if(author){
						author.send({embed: {
							description: `**${args.slice(1).join(" ")}**`
						}})
					}
				}
				require('../../tools/database/newTimeout')({
					from: (new Date()).getTime(),
					to: (new Date()).getTime() + time,
					functions: f.toString()
				});
				client.setTimeout(f, time);
				client.setTimeout(() => {

				})
				return message.channel.send('Okê bạn êy.')
			}
		}catch (e) {
            return require("../../tools/functions/error")(e, message)
        }
	}
}