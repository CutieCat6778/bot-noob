const a = require('../../models/starboard.js');

module.exports = async(id) => {
	let afk = await a.findOne({_id: id}).catch(e => require('../functions/error')(e));
	if(!afk) afk = await a.findOne({embedId: id}).catch(e => require('../functions/error')(e));
	return afk ? afk : undefined;
}