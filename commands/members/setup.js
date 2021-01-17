const {MessageEmbed, WebhookClient} = require('discord.js');

module.exports = {
	config: {
		name: "setup",
		aliases: ['setp'],
		category: "members",
		perms: ['SEND_MESSAGES'],
		bot: ['SEND_MESSAGES'],
		usage: []
	},
	async execute(client, commands, args, guild) {
		try{
			const channel = await message.member.createDM();
			message.channel.send("Đã gửi vào trong tin nhắn trực tiếp(DM)")
			const filter = (user) => user.id == message.author.id;
			const results = [];
			const questions = ['Tên thật của bạn là gì?(What is your real name?)', 'Ngày tháng năm sinh?(Your birthday?) [DD/MM/YY][NGÀY/THÁNG/NĂM]', 'Bạn hiện đang ở đâu?(Where is your current location?)']
			const ask = (q) => {
				const embed = new MessageEmbed()
					.setDescription(`**${q}**`)
				channel.send(embed).then(async m => {
					const collected = await m.channel.awaitMessages(filter, {max: 1, time: 3000});
					if(collected){
						const answer = collected.first().content;
						if(questions.indexOf(q) == 1){
							const regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/gm
							if(!answer.match(regex)){
								return channel.send("Ngày tháng năm sinh không hợp lệ, làm ơn hãy thử lại.")
							}
						}
						results.push(answer);
					}else if(!collected){
						channel.send('Làm ơn, bạn hãy làm lại, tại vì bạn trả lời quá chậm.')
						return message.member.deleteDM();
					}
				})
			}
			for(let qe of questions){
				ask(qe);
			}
			const embed1 = new MessageEmbed()
				.setTitle("Bạn có muốn gửi đi không? [y/n]")
			message.channnel.send(embed1).then(msg => {
				msg.channel.awaitMessages(filter, {max: 1, time: 3000}).then(async m => {
					if(m.first().content == "y"){
						const hook = new WebhookClient(guild.hook.id, guild.hook.token);
						if(!hook){
							const user = message.guild.members.cache.get("762749432658788384");
							user.send("Ê, tạo cho tao cái webhook.");
						}
						const embed = new MessageEmbed()
							.setTitle(`${message.auhor.tag}`)
							.setFooter('Có người vừa mới điền form')
							.setTimestamp()
						for(let res of results){
							embed.addField(questions[results.indexOf(res)], res)
						}
						const user = await require('../../tools/database/getUser')(message.member.id);
						const bd = results[1].split('/')
						const obj = {
							_id: message.member.id,
							birthday: {
								day: bd[0],
								month: bd[1],
								year: bd[2]
							},
							realName: results[0],
							location: results[2]
						}
						user = obj;
						await user.save();
						return hook.send(embed);
					} else {
						return message.channel.send("Đã hủy.")
					}
				})
			})
		}catch(e){
			return require('../../tools/functions/error')(e, message);
		}
	}
}