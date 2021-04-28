module.exports = async(client, member) => {
	const newInvites = await member.guild.fetchInvites();
	let found = false;
	newInvites.forEach(newInvite => {
		if(found) return;
		let invite = client.invites.get(newInvite.code)
		if(!found && (newInvite.uses > invite.uses) && (newInvite.code == invite.code)) {
			found = true;
			const channel = member.guild.channels.cache.get('721203266892988489');
			const user = member.guild.members.cache.get(newInvite.inviter.id);
			const text = `Chào mừng ${member} đã đến với **Động Noobs**. Được mời bởi **${user.user.tag}**!`;
			return channel.send(text);
		}
	}).then(() => {
		if(!found){
			const channel = member.guild.channels.cache.get('721203266892988489');
			const text = `Chào mừng ${member} đã đến với **Động Noobs**!`;
			return channel.send(text);
		}
	})
}