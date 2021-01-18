const a = require('../../models/afk.js');

module.exports = async(id) => {
	const afk = await a.findOne({_id: id}).catch(e => require('../functions/error')(e));
	return afk ? afk : undefined;
}