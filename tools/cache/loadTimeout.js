const Timeouts = require('../../models/timeout.js');

module.exports = async(client) => {
	let timeouts = await Timeouts.find().catch(e => require('../functions/error')(e));
	if(timeouts.length != 0){
		for(let timeout of timeouts){
			const date = new Date();
			client.timeouts.set(timeouts.indexOf(timeout) ? timeouts.indexOf(timeout) : client.timeouts.size, timeout);
			setTimeout(async() => {
				const author = await client.users.fetch(timeout.id);
				const args = timeout.args;
				eval(timeout.function.toString() + '\nf()');
				return require('../database/removeTimeout.js')(timeout.from);
			}, timeout.to - date.getTime())
		}
	}
}