const {
	MessageEmbed,
	WebhookClient
} = require('discord.js');

module.exports = {
	config: {
		name: "setup",
		aliases: ['setp'],
		category: "members",
		perms: ['SEND_MESSAGES'],
		bot: ['SEND_MESSAGES'],
		usage: []
	},
	async execute(client, message, args, guild) {
		try {
			const channel = await message.member.createDM();
			message.channel.send("Đã gửi vào trong tin nhắn trực tiếp(DM)")
			const questions = ['Tên thật của bạn là gì?(What is your real name?)', 'Ngày tháng năm sinh?(Your birthday?) [DD/MM/YY]', 'Bạn hiện đang ở đâu?(Where is your current location?)']            
			const filter = m => m.author.id == message.author.id;
			let i = 0;
			const answers = [];
			async function loop(q) {
	            channel.send({embed: {
	            	description: q[i]
	            }});
	            let collected = await require('../../tools/functions/collectMessage')(message, filter, null, channel);
	            answers.push({ "num": i, "content": collected.content.toString() });
	            i++;
	            if (i == 3	) {
	                const embed = new MessageEmbed()
	                    .setTitle(`Tổng kết`)
	                    .setDescription(`${answers.map(a => `**[${a.num + 1}]** - ${a.content.toString()}`).join('\n')}`)
	                    .setFooter(message.member.displayName, message.author.displayAvatarURL())
	                    .setTimestamp()
	                    .setThumbnail(message.author.displayAvatarURL())
	                channel.send(embed);
	                channel.send("Bạn có muốn gửi nó đi không? [y/n]");
	                let collected1 = await require('../../tools/functions/collectMessage')(message, filter, null, channel);
	                if (collected1.content == "y") {
	                    const hook = new WebhookClient("795249506471772201", "LjqrqRoJpvuljTF4CxX-C1hSocTh9G9PKEI9sup_CgieWqUKPoxhfo78nngpxmPLQe3E");
						if(!hook){
							new Error("Webhook not found");
							return channel.send(`Đang bị lỗi, hãy kêu thằng CutieCat#6778.`)
						}
						const embed = new MessageEmbed()
							.setTitle(`${message.author.tag}`)
							.setFooter('Có người vừa mới điền form')
							.setTimestamp()
							.setThumbnail(message.author.displayAvatarURL())
		                    .setDescription(`${answers.map(a => `**${questions[a.num]}**\n\t\t\t-\t${a.content.toString()}`).join('\n\n')}`)
						let user = await require('../../tools/database/getUser')(message.member.id);
						const bd = answers[1].content.split('/');
						user._id = message.member.id;
						user.birthday = {
							day: bd[0],
							month: bd[1],
							year: bd[2]
						};
						user.realName = answers[0].content;
						user.location = answers[2].content;
						await user.save();
						channel.send('Đã gửi đi thành công! 👌');
						return hook.send(embed);
	                } else {
	                    return message.channel.send("Đã hủy.");
	                }
	            }
	            loop(questions);
	        }
	        loop(questions);
		} catch (e) {
			return require('../../tools/functions/error')(e, message);
		}
	}
}