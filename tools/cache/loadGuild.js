module.exports = async(client) => {
	let guild = await require('../database/getGuild.js')();
	client.guild = guild;
}