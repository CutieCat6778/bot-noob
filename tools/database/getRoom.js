const a = require('../../models/rooms.js');

module.exports = async(id) => {
	const room = await a.findOne({_id: id}).catch(e => require('../functions/error')(e));
	return room ? room : undefined;
}