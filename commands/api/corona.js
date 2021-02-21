const MessageEmbed = require('../../classes/newEmbed');
const request = require('request');
module.exports = {
    config: {
        name: "corona",
        aliases: ["covid19", "covirus"],
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"],
        category: "api"
    },
    async execute(client, message, args, guildCache) {
        try{
            let url = "https://api.covid19api.com/summary";
            url = encodeURI(url);
            request({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': "application/json",
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0'
                }
            }, function (err, response, body) {
                if (err) {
                    return require('../../tools/function/error')(err, message)
                }
                body = JSON.parse(body);
                let country;
                if(args[0]){
                    country = body.Countries.find(c => c.CountryCode == args[0].toUpperCase()) || body.Countries.find(c => c.Country.toLowerCase() == args.slice(0).join(" ").toLowerCase());
                    if (!country) return message.channel.send("Country code/name not found");
                }else if(!args[0]){
                    country = body.Global;
                    country.Country = "Global";
                    country.Date = body.Date;
                }
                let embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setTitle(`<:covid:774311088334045184> ${country.Country} corona stats`)
                    .setTimestamp(country.Date)
                    .setFooter("Last update")
                    .addField("New confirmed", country.NewConfirmed, true)
                    .addField("Total confirmed", country.TotalConfirmed, true)
                    .addField("New deaths", country.NewDeaths, true)
                    .addField("Total deaths", country.TotalDeaths, true)
                    .addField("New recovered", country.NewRecovered, true)
                    .addField("Total recovered", country.TotalRecovered, true)
                return require('../../tools/function/sendMessage')(message, embed);
            })
        }catch(e){
            return require('../../tools/function/error')(e, message);
        }
    }
}