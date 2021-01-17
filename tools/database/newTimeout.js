const Timeout = require('../../models/timeout.js');

module.exports = async(obj) => {
	const timeout = new Timeout(obj);
	await timeout.save();
	return timeout;
}