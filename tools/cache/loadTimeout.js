const Timeouts = require('../../models/timeout.js');

module.exports = async(client) => {
	let timeouts = await Timeouts.find().catch(e => require('../functions/error')(e));
	if(timeouts.length != 0){
		for(let timeout of timeouts){
			const date = new Date();
			client.timeouts.set(timeouts.indexOf(timeout) ? timeouts.indexOf(timeout) : client.timeouts.size, timeout);
			client.setTimeout(() => {
				const guild = client.guilds.cache.get(timeout.guild);
				eval(timeout.function);
			}, timeout.to - date.getTime())
		}
	}
}