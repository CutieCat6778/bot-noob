module.exports = async (client) => {
    try {
        client.invites = new Map();
        const guild = client.guilds.cache.get('721203266452586507');
        let invites = await guild.fetchInvites();
        for (let [key, value] of invites.entries()) {
            if (guild.vanityURLCode) client.invites.set(guild.vanityURLCode, await guild.fetchVanityData());
            value.code ? client.invites.set(key, value) : null;
        }
    } catch (e) {
        return require('../functions/error')(e);
    }
}