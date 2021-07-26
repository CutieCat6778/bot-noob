module.exports = async (client, old, n) => {
    try {
        if(n.member.bot) return;
        // Voice EXP++
        // if(!old.channel && n.channel){
        //     // User join voice
        //     let user = client.voiceexp.get(n.member.id);
        //     if(!user) client.voiceexp.set(n.member.id, (new Date()).getTime()), user = client.voiceexp.get(n.member.id);
        //     else if(user) user = (new Date()).getTime();
        // }else if(old.channel && !n.channel){
        //     // User leave voice
        //     const user = client.voiceexp.get(n.member.id);
        //     if(!user) return;
        //     else if(user){
        //         const time = Math.floor(((new Date()).getTime() - user) / 1000);
        //         if(time > 0){
        //             const addExp = time / 10;
        //             const data = await require('../../tools/database/getLevel')(n.member.id);
        //             if (data) {
        //                 console.log(addExp, data.exp, data.total);
        //                 data.exp += addExp;
        //                 data.total += time / 1000;
        //                 console.log(data.exp, data.total);
        //                 if ((data.exp >= data.level * 400 && data.level > 0) || (data.exp > 400 && data.level == 0)) {
        //                     data.level++;
        //                     data.exp = 0;
        //                     const channel = n.guild ? n.guild.channels.cache.get('801567245351780433') : old.guild.channels.cache.get('801567245351780433');
        //                     channel.send(`GG ${n.member}\nGà vậy mà vẫn lên level **${data.level}** 😏`);
        //                 }
        //                 await data.save(); 
        //             }
        //         }else return;
        //     }
        // }
        // Voice Manager
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