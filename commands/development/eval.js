const StringTools = require("string-toolkit");
const stringTools = new StringTools;
const MessageEmbed = require('../../classes/newEmbed');
module.exports = {
    config: {
        name: "eval",
        aliases: ["code"],
        category: "development",
        perms: ["BOT_OWNER"],
        description: "Don't touch, when you don't know what is"
    },
    async execute(client, message, args) {
        try {
            let nooutput = message.content.endsWith('-nou');
            if(nooutput){
                args.pop();
            }
            const date1 = new Date();
            if (!args[0]) return;
            if (args[0] == "map") {
                const util = require("util");
                const evaluted = eval(args.slice(1).join(" "));
                const output = await require("../../tools/string/textsplit")(util.inspect(evaluted), true);
                if (!output) return message.channel.send("Undefined")
                await message.channel.send(`Type of: ${typeof (evaluted)} | ${require("ms")((new Date() - date1), { long: true })}`);
                return message.channel.send(output);
            }
            console.log(args.slice(0).join(" "));
            const evaluted = eval(args.slice(0).join(" "));
            if(!nooutput){
                console.log(evaluted)
                const output = await require("../../tools/string/textsplit")(evaluted);
                if (!output) return message.channel.send("Undefined")
                await message.channel.send(`Type of: ${typeof (evaluted)} | ${require("ms")((new Date() - date1), { long: true })}`);
                message.channel.send(output);
            }
        } catch (error) {
            const output = require('../../tools/string/textsplit')(error.stack);
            console.log(error);
            let embed = new MessageEmbed()
                .setColor("#40598F")
                .addField("Eval", `
                    \`\`\`console${output}\`\`\`
                `)
                .addField("command", `${message.content ? message.content : "Client error, no commands info"}`)
                .setTimestamp()
            return message.channel.send(embed);
        }
    }
}