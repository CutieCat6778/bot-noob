const newEmbed = require('../../classes/newEmbed');

module.exports = {
    config: {
        name: "voiceinfo",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['vcinfo'],
        category: "voice"
    },
    async execute(client, message, args, guildCache) {
        try{
            const voice = client.voices.get(message.member.voice.channelID);
            if(voice){
                const embed = new newEmbed()    
                    .setTitle(message.member.voice.channel.name)
                    .addFields([
                        {"name": "Chủ phòng", "value": message.guild.members.cache.get(voice.owner).displayName},
                        {"name": "Status", "value": voice.status, inline: true},
                        {"name": "Tần số", "value": message.member.voice.channel.bitrate / 1000, inline: true},
                        {"name": "\u200b", "value": "\u200b", inline: true},
                        {"name": "Block", "value": voice.deny.length > 0 ? voice.deny.map(a => message.guild.members.cache.get(a)).join('\n') : 'không có', inline: true},
                        {"name": "Cho phép", "value": voice.allow.length > 0 ? voice.allow.map(a => message.guild.members.cache.get(a)).join('\n') : "không có", inline: true}
                    ])
                    .setTimestamp(message.member.voice.channel.createdAt)
                    .setFooter('Phòng được tạo lúc')
                return message.channel.send(embed);
            }else if(!voice) return message.channel.send('Bạn cần phải ở trong một Voice nào đó!');
        }catch(e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
}