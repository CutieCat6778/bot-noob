const Afk = require('../../models/afk.js');

module.exports = async(client) => {
	const AFK = await Afk.find().catch(e => require('../functions/error.js')(e));
	if(!AFK) return;
	else if(AFK){
		for(let afk of AFK){
			client.afk.set(afk._id, afk);
		}
		return true;
	}
}