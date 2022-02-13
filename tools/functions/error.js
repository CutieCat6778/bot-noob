const { WebhookClient } = require('discord.js');
const hook = new WebhookClient({ url: process.env.url });
const errorFile = require('../../error.json');

module.exports = (error, message) => {
    try {
        console.log(error);
        // Spliting to 2 types of errors
        if (message) { // Client error
            const language = errorFile[(message.guildCache ? message.guildCache.language : "en")];
            if (error.stack) { // NodeJS error return
                // Sending a error message to client
                const embed = {
                    color: "#e5383b",
                    title: language[0],
                    description: language[1],
                    timestamp: message.createdAt,
                    footer: {
                        text: language[2],
                        icon_url: message.client.user.displayAvatarURL()
                    }
                }
                require('./sendMessage')(message, { embeds: [embed] });

                // Spliting error text to smaller size
                const errorDetail = require('../string/textSplit')(error.stack);

                // Sending error to dev server
                const devEmbed = {
                    color: "#e5383b",
                    title: "Error has been found!",
                    description: `**Content** ${message.content}\n**Command** ${message.command ? message.command.name : "Not found"}\n\n**Error detail**\n\`\`\`console\n${errorDetail}\n\`\`\``,
                    timestamp: message.createdAt,
                }
                hook.send({ embeds: [devEmbed] });
                return message.command ? message.client.commands.get(message.command.name).disable = true : null;
            } else { // String error
                // Sending a error message to client
                const embed = {
                    color: "#e5383b",
                    title: language[0],
                    description: language[1],
                    timestamp: message.createdAt,
                    footer: {
                        text: language[2],
                        icon_url: message.client.user.displayAvatarURL()
                    }
                }
                require('./sendMessage')(message, { embeds: [embed] });

                // Sending error to dev server
                const devEmbed = {
                    color: "#e5383b",
                    title: "Error has been found!",
                    description: `**Content** ${message.content}\n**Command** ${message.command ? message.command.name : "Not found"}\n\n**Error detail**\n\`\`\`console\n${error}\n\`\`\``,
                    timestamp: message.createdAt,
                }
                hook.send({ embeds: [devEmbed] });
                return message.command ? message.client.commands.get(message.command.name).disable = true : null;
            }
        } else { // Server error
            if (error.stack) {
                // Spliting error text to smaller size
                const errorDetail = require('../string/textSplit')(error.stack);

                // Sending error to dev server
                const devEmbed = {
                    color: "#e5383b",
                    title: "Error has been found!",
                    description: `**Error detail**\n\`\`\`\n${errorDetail}\n\`\`\``,
                    timestamp: new Date(0)
                }
                hook.send({ embeds: [devEmbed] });
            } else {
                // Sending error to dev server
                const devEmbed = {
                    color: "#e5383b",
                    title: "Error has been found!",
                    description: `**Error detail**\n\`\`\`\n${error}\n\`\`\``,
                    timestamp: new Date()
                }
                hook.send({ embeds: [devEmbed] });
            }
        }
    } catch (e) {
        return new Error(e);
    }
}