module.exports = {
    config: {
        name: "region",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['server', 'doiserver', 'đổiserver'],
        category: "members",
        usage: ['[name]']
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!message.member.voice.channel) return message.reply('bạn phải ở trong voice!');
            const regions = [null, 'us-west', 'us-east', 'us-central', 'us-south', 'singapore', 'southafrica', 'sydney', 'rotterdam', 'brazil', 'hongkong', 'russia', 'japan', 'india', 'south-korea'];
            const name = args[0];
            if(!regions.indexOf(name)) return message.reply(`những region chỉ có thể là \`${regions.join('\`, \`')}\``);
            await message.member.voice.channel.setRTCRegion(name);
            return message.react('<:hmmmmm:770520614444335104>')
        } catch (e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
}