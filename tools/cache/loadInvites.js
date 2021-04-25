module.exports = async(client) => {
    try{
        const guild = client.guilds.cache.get('721203266452586507');
        const invites = await guild.fetchInvites();
        invites.forEach(a => {
            client.invites.set(a.code, a);
        })
    }catch(e){
        return require('../functions/error')(e);
    }
}