module.exports = async (client) => {
    try {
        const guild = client.guilds.cache.get('721203266452586507');
        let invites = await guild.invites.fetch();
        for (let [key, value] of invites) {
            if (guild.vanityURLCode) client.invites.set(guild.vanityURLCode, await guild.fetchVanityData());
            value.code ? client.invites.set(key, value) : null;
        }
    } catch (e) {
        return require('../functions/error')(e);
    }
}