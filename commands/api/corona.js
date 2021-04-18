const MessageEmbed = require('../../classes/newEmbed');
const request = require('request');
module.exports = {
    config: {
        name: "corona",
        aliases: ["covid19", "covirus"],
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"],
        category: "api",
        usage: ['[Country_code]']
    },
    async execute(client, message, args, guildCache) {
        try{
            let url = `https://www.trackcorona.live/api/countries/${args[0].toUpperCase()}`;
            url = encodeURI(url);
            request({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': "application/json",
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0'
                }
            }, function (err, response, body) {
                if (err || JSON.parse(body).code != 200) {
                    return require('../../tools/functions/error')(err, message)
                }
                body = JSON.parse(body);
                const country = body.data[0];
                if(!country || body.data.length === 0) return message.channel.send("Không tìm thấy tên đất nước!");
                let embed = new MessageEmbed()
                    .setTitle(`${country.location}`)
                    .setTimestamp(country.updated)
                    .setFooter("Lần cập nhật cuối")
                    .addField("Tổng đã mắc", country.confirmed)
                    .addField("Tổng đã chết", country.dead)
                    .addField("Tổng đã phục hồi", country.recovered)
                return message.channel.send(embed);
            })
        }catch(e){
            return require('../../tools/functions/error')(e, message);
        }
    }
}