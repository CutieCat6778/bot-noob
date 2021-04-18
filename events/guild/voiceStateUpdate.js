module.exports = async (client, old, n) => {
    try {
        if(n.member.bot) return;
        if(!n.guild.me.permissions.has(['MOVE_MEMBERS', 'MANAGE_CHANNELS', 'MANAGE_ROLES'])) return;
        if (!old.channel && n.channel) {
            if (n.channelID == "816625926401163284") {
                const channel = await n.guild.channels.create("Phòng #" + require('../../tools/string/numberConverter_2')(parseInt(client.voices.size) + 1), { type: 'voice', parent: '800139706250559518' });
                n.setChannel(channel, "Người dùng đã vào channel tạo voice!");
                let voiceCache = client.voices.get(channel.id);
                if (!voiceCache) {
                    client.voices.set(channel.id, {
                        id: channel.id,
                        owner: n.member.id,
                        status: "open",
                        allow: [],
                        deny: [],
                        members: 0
                    })
                    voiceCache = client.voices.get(channel.id)
                }
                voiceCache.members++;
                console.log(`${n.member.displayName} joined ${channel.id}`);
            }
        } else if (old.channel && !n.channel) {
            let voiceCache = client.voices.get(old.channel.id);
            console.log(client.voices, old.channelID, voiceCache)
            if (voiceCache) {
                console.log(`${old.member.displayName} left ${old.channel.name}`);
                voiceCache.members--;
                if (n.member.id == voiceCache.owner) voiceCache.owner = null;
                if (voiceCache.members == 0) {
                    client.voices.delete(old.channelID);
                    old.channel.delete();
                }
            }
        }
    } catch (e) {
        return require('../../tools/functions/error')(e);
    }
}