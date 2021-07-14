const Flickr = require('flickr-sdk');
const flickr = new Flickr(process.env.FLICKR_API_KEY);
const MessageEmbed = require('../../classes/newEmbed');

module.exports = {
    config: {
        name: "gai",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['gaixinh', 'gái', 'gáixinh'],
        category: "members"
    },
    async execute(client, message, args, guildCache) {
        try {
            flickr.photos.search({
                text: 'Gái Xinh Chọn Lọc'
            }).then(function (res) {
                const body = res.body
                if (body.stat != "ok") return new Error('API res stat is not ok!');
                const photos = body.photos.photo;
                const random = Math.floor(Math.random() * photos.length);
                flickr.photos.getInfo({
                    photo_id: photos[random].id // sorry, @dokas
                }).then(function (res) {
                    const imageData = res.body.photo;
                    const url = `http://farm${imageData.farm}.staticflickr.com/${imageData.server}/${imageData.id}_${imageData.secret}.jpg`
                    const embed = new MessageEmbed()
                        .setFooter(`Lượt xem ${imageData.views}`)
                        .setTimestamp(imageData.dates.posted)
                        .setImage(url)
                    return message.channel.send(embed);
                }).catch(function (err) {
                    return require('../../tools/functions/error')(err, message);
                });
            }).catch(function (err) {
                return require('../../tools/functions/error')(err, message);
            });
        } catch (e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
}