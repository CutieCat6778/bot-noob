module.exports = (client, member) => {
	const channel = member.guild.channels.cache.get('721203266892988489');
	const text = `Chào mừng ${member} đã đến với Noobs server!`;
	return channel.send(text);
}