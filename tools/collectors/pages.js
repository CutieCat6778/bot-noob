module.exports = async (client) => {
	try{
		const guild = client.guilds.cache.get('721203266452586507');
		const channel = guild.channels.cache.get('813765397353725962');
		let msg;
		const embeds = require('../../asset/embeds/rules.json');
		let currentPage = 0;
	
		const sendEmbed = async() => {
			const embed = {embed: embeds[0]};
			const m = await channel.send(embed);
			msg = await channel.messages.fetch(m.id);
		}
	
		const collectEmojis = async(message) => {
			currentPage > 0 ? await message.react('⬅️') : null;
			await message.react('➡️');
			const collector = await message.createReactionCollector(
				(reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name),
			)
			collector.on('collect', (reaction, user)=> {
				if(user.bot) return;
				message.reactions.removeAll().then(async () => {
					reaction.emoji.name === '⬅️' ? currentPage -= 1 : currentPage += 1
					message.edit({embed: embeds[currentPage]})
					if (currentPage !== 0) await message.react('⬅️')
					if (currentPage + 1 < embeds.length) message.react('➡️')
				})
			})
			collector.on('end', reaction => {
				return collectEmojis(message);
			})
		}
	
		(async() => {
			await sendEmbed();
			await collectEmojis(msg);
		})()
	}catch(e){
		return require('../functions/error')(e);
	}
}