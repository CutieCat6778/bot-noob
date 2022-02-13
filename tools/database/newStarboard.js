const a = require('../../models/starboard.js');

module.exports = async(obj) => {
	const timeout = new a(obj);
	await timeout.save();
	return timeout;
}