module.exports = async(client, invite) => {
    client.invites.set(invite.code, invite);
    const data = await require('../../tools/database/getLevel')(invite.inviter.id);
    if(data){
        data.server.invites.push(new Date().getTime());
        data.updates.push(new Date().getTime());
        await data.save();
    }
}