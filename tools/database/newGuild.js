const Guild = require('../../models/guild.js');
const defaultGuild = require('../../default.js');

module.exports = async() => {
	let guild = await Guild.findOne({_id: "721203266452586507"});
	if(!guild){
		guild = new Guild(defaultGuild);
		await guild.save();
		return guild;
	}else if(guild && guild != null) return guild;
}