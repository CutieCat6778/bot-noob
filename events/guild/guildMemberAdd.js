module.exports = async (client, member) => {
    if (member.bot) return;
    const data = await require('../../tools/database/getLevel')(member.id);
    if (data) {
        data.server.join.push((new Date()).getTime());
        if (new Date(data.updates[(data.updates.length) - 1]).getDate() != new Date().getDate()) data.updates.push(new Date().getTime());
        await data.updateOne(data, (err, result) => {
                    if(err) throw err;
                })
    }
    if (member.partial) member = await member.fetch();
    let welcomeChannel = await client.channels.fetch('721203266892988489').catch(err => console.error(err));
    if (member.user.bot) return welcomeChannel.send(`${member.toString()} đã vào bằng OAuth flow.`).catch(err => console.error(err));
    welcomeChannel.send(`${member.toString()} đã vào, chào mừng đến với Noobs`).catch(err => console.error(err));
    await member.roles.add('937101622847373322');
}