const Flickr = require('flickr-sdk');
const flickr = new Flickr(process.env.FLICKR_API_KEY);
const MessageEmbed = require('../../classes/newEmbed');

module.exports = {
    config: {
        name: "image",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['generateimage'],
        category: "api"
    },
    async execute(client, message, args, guildCache) {
        try{
            if(!args[0]) return;
            flickr.photos.search({
                text: args.slice(0).join(" ")
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
        }catch(e) {
            return require('../../tools/functions/error')(e, message);
        }
    }
}