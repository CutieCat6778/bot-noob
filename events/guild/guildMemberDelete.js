module.exports = (client, member) => {
	const channel = member.guild.channels.cache.get('721203266892988489');
	const text = `${member.user.tag} đã rời Noobs server, mong bạn ấy sẽ quay lại sớm!`;
	return channel.send(text);
}