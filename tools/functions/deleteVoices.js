module.exports = (client) => {
    try{
        const guild = client.guilds.cache.get('721203266452586507');
        const channels = guild.channels.cache.filter(a => a.parentId == "800139706250559518" && a.type == "GUILD_VOICE");
        channels.forEach(channel => {
            if(channel.members.size == 0 && !client.whitelistChannels.includes(channel.id)) {
                channel.delete('inactive channel');
            }
        })
    }catch(e){
        return require('./error')(e);
    }
}
