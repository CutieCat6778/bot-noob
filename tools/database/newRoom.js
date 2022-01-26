const a = require('../../models/rooms.js');

module.exports = async(obj) => {
	const timeout = new a(obj);
	await timeout.save();
	return timeout;
}