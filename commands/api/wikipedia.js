const fetch = require("node-fetch");
const MessageEmbed = require('../../classes/newEmbed');
const htmlToText = require('html-to-text');
module.exports = {
    config: {
        name: "wikipedia",
        aliases: ["wiki"],
        category: "api",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                let embed = await require("../../noArgs/api/wikipedia.js")(guildCache.prefix);
                return message.channel.send(embed);
            } else if (args[0]) {
                const value = args.slice(0).join(" ").toString();
                let info = await getInfo(value);
                let url = await getUrl(value);
                if (info.length >= 1) {
                    let embed = new MessageEmbed()
                        .setColor("#40598F")
                        .setTitle(`I found ${info.length} result`)
                        .setDescription(`Enter a number to get result about it or type \`cancel\` to cancel`)
                    if (info.length < 5) {
                        for (i = 0; i < info.length; i++) {
                            embed.addField(`Result: ${i + 1}`, info[i].title)
                        }
                    } else if (info.length >= 5) {
                        for (i = 0; i < 5; i++) {
                            embed.addField(`Result: ${i + 1}`, info[i].title)
                        }
                    }
                    message.channel.send(embed).then(async m => {
                        const filter = m => m.author.id == message.author.id;
                        let collected = await require('../../tools/functions/collectMessage')(message, filter);
                        if (isNaN(collected.content) == true) return message.channel.send("Invalid number");
                        let num = parseInt(collected.content) - 1;
                        if (parseInt(num) > 5) return message.channel.send("Result not found");
                        else if (isNaN(num) == false) {
                            if (!info[num]) {
                                return message.channel.send("Result not found");
                            } else if (info[num]) {
                                let res = info[num];
                                let embed = new MessageEmbed()
                                    .setColor("#40598F")
                                    .setTitle("<:wiki:774348022917759016> " + res.title)
                                    .setDescription(`[More information](${url[3][num]})\n\n${htmlToText.fromString(res.snippet)} ...`)
                                    .setTimestamp(res.timestamp)
                                    .setFooter("Last update")
                                return m.edit(embed);
                            }
                        }

                    })
                } else if (info.length == 0) {
                    let embed = new MessageEmbed()
                        .setColor("#40598F")
                        .setDescription(`There are no information about **${value}**`)
                    return message.channel.send(embed);
                }

            }
        } catch (e) {
            return require("../../tools/functions/error")(e, message);
        }
    }
}

function getUrl(value) {
    const res = fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&srlimit=5&search=${value}`)
        .then(async res => {
            res = await res.json();
            return res;
        })
    return res;
}
function getInfo(value) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${value}`;
    const res = fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            let result = data.query.search;
            return result;
        })
    return res;
}