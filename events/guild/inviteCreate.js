module.exports = (client, invite) => {
    console.log(invite.code)
    client.invites.set(invite.code, invite);
}