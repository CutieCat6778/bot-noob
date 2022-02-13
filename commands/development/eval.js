const StringTools = require("string-toolkit");
const stringTools = new StringTools;
const MessageEmbed = require("../../classes/newEmbed")
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
            if (!args[0]) return;
            const evaluted = eval(args.slice(0).join(' '));
            if (!evaluted) return client.send(message, "Undefined");
            const output = `\`\`\`json\n${require('../../tools/string/textsplit')(util.inspect(evaluted), true)}\n\`\`\``;
            return client.send(message, output + `\n\`${typeof (evaluted)}\` -  **${require('ms')(new Date().getTime() - message.createdAt, { long: true })}**`);
        } catch (e) {
            return client.error(e);
        }
    }
}