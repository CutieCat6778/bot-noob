const MessageEmbed = require('../../classes/newEmbed');

module.exports = {
	config: {
		name: "newmember",
		aliases: ['newmem', 'newm', 'nguoimoi', 'nguoim'],
		usage: ['@newmember'],
		category: "rules",
		perms: ["SEND_MESSAGES"],
		bot: ["SEND_MESSAGES"]
	},
	async execute(client, message, args, guild) {
		try{
			const id = require('../../tools/string/mention')(args[0]);
			if(id){
				message.channel.send(`<@${id}>`);
				message.delete();
			}
			const embed = new MessageEmbed()
				.setTitle('Luật dành cho những bạn mới vào')
				.setDescription(`- Xin bạn hãy vào kênh <#${guild.rules._id}> để có thể đọc **tất cả các luật mà server này đưa ra**.\n - Và làm ơn bạn hãy điền vào cái **[form](https://forms.gle/mBcYCqQNv5ugXSUW7)** này, để chúng mình có thể dễ __làm quen và nhận biết__ hơn.\n- Bạn hãy vào **<#802254125970358273>** để có thể lấy role theo độ tuổi của mình!\n\n**Cảm ơn và chúc bạn một ngày tốt lành :)**`)
				.setTimestamp()
				.setFooter('luật dành cho những bạn mới vào', message.guild.iconURL())
			message.delete();
			return message.channel.send(embed);
		}catch(e){
			return require('../../tools/functions/error')(e, message);
		}
		
	}
}