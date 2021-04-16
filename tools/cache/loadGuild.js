module.exports = async(client) => {
	let guild = await require('../database/updateGuild.js')();
	client.guild = guild;
}