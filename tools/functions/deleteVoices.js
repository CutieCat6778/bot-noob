module.exports = (client) => {
    try{
        const guild = client.guilds.cache.get('721203266452586507');
        const channels = guild.channels.cache.filter(a => a.parentId == "800139706250559518" && a.type == "GUILD_VOICE");
        channels.forEach(channel => {
            if(channel.members.size == 0 && !client.whitelistChannels.includes(channel.id)) {
                try{
                    if(channel.name == "「➕」Tạo Phòng") return;
                    if(!channel.permissionsFor(client.user.id).has(["MANAGE_CHANNELS"])) return;
                    channel.delete('inactive channel');
                    if(client.voices.get(channel.id)) client.voices.delete(channel.id);
                }catch(e){
                    return require('./error')(e);
                }
            }
        })
    }catch(e){
        return require('./error')(e);
    }
}
