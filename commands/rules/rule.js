const {MessageEmbed} = require('discord.js');

module.exports = {
	config: {
		name: "rule",
		aliases: ['rules', 'luat'],
		perms: ["SEND_MESSAGES"],
		bot: ["SEND_MESSAGES"],
		usage: ['(RULE_NUMBER)', '[@user]', '[--newmem, -nm]'],
		category: 'rules'
	},
	async execute(client, message, args, guild) {
		if(message.content.endsWith('--newmem') || message.content.endsWith('-nm')){
			if(isNaN(args[0]) == true) return message.channel.send("Đó không phải là một con số!");
			if(isNaN(args[0]) == false){
				const num = parseInt(args[0]);
				const rule = guild.rules.newMem.find(a => a.num == num);
				if(!rule) return message.channel.send(`Không thế tìm thấy Luật có số **${num}**`);
				if(rule){
					const embed = new MessageEmbed()
						.setTitle(`Luật số ${num} dành cho bạn mới vào`)
						.setDescription(`**-  ${rule.content}** \n\n Xin bạn hãy vào lại <#${guild.rules._id}> để có thể biết thêm chi tiết!`)
						.setTimestamp()
						.setFooter('Bộ luật dành cho những bạn mới vào', message.guild.iconURL())
					const id = require('../../tools/string/mention')(args[1]);
					if(id){
						message.channel.send(`<@${id}>`);
						message.delete();
					}
					return message.channel.send(embed);
				}
			}
		}else{
			if(isNaN(args[0]) == true) return message.channel.send("Đó không phải là một con số!");
			if(isNaN(args[0]) == false){
				const num = parseInt(args[0]);
				const rule = guild.rules.list.find(a => a.num == num);
				if(!rule) return message.channel.send(`Không thế tìm thấy Luật có số **${num}**`);
				if(rule){
					const embed = new MessageEmbed()
						.setTitle(`Luật số ${num}`)
						.setDescription(`**-  ${rule.content}** \n\n Xin bạn hãy vào lại <#${guild.rules._id}> để có thể biết thêm chi tiết!`)
						.setTimestamp()
						.setFooter('Bộ luật dành cho tất cả mọi người', message.guild.iconURL())
					const id = require('../../tools/string/mention')(args[1]);
					if(id){
						message.channel.send(`<@${id}>`);
						message.delete();	
					}
					return message.channel.send(embed);
				}
			}
		}
	}
}