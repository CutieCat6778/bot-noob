module.exports = async (client, member) => {
    if (member.partial) member = await member.fetch();
    let welcomeChannel = await client.channels.fetch('721203266892988489').catch(err => console.log(err));
    if (member.user.bot) return welcomeChannel.send(`${member.toString()} đã vào bằng OAuth flow.`).catch(err => console.log(err));
    const newInvites = await member.guild.invites.fetch();
    if (member.guild.vanityURLCode) newInvites.set(member.guild.vanityURLCode, await member.guild.fetchVanityData());
    const usedInvite = newInvites.find(inv => (client.invites.get(inv.code).uses < inv.uses));
    if (!usedInvite) return welcomeChannel.send(`${member.toString()} đã vào, nhưng tôi không thể truy vết!`).catch(err => console.log(err));
    if (usedInvite.code === member.guild.vanityURLCode) {
        welcomeChannel.send(`${member.toString()} đã vào bằng đường link chính thức của server`);
        return;
    };
    let toSend = `**${member}** đã đến với Noobs, nhờ sự giúp đỡ của **<@${usedInvite.inviter.id}>**`
    welcomeChannel.send(toSend).catch(err => console.log(err));
    return client.invites.get(usedInvite.code).uses++;
}