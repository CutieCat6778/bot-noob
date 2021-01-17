const Guild = require('../../models/guild.js');

module.exports = async() => {
	let guild = await Guild.findOne({_id: 721203266452586507}).catch(e => require('../functions/error')(e));
	if(!guild) {
		guild = await require('./newGuild.js')();
	}
	return guild;
}