const a = require('../../models/timeout.js');

module.exports = async(time) => {
	const timeout = await a.findOne({from: time}).catch(e => require('../../tools/functions/error')(e));
	return timeout ? timeout : undefined;
}