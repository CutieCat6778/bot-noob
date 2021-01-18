const a = require('../../models/afk.js');

module.exports = async(obj) => {
	const timeout = new a(obj);
	await timeout.save();
	return timeout;
}