const { readdirSync } = require("fs")

module.exports = (client) => {
    try {
        const load = dirs => {
            const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
            for (let file of events) {
                const evt = require(`../events/${dirs}/${file}`);
                let eName = file.split('.')[0];
                client.on(eName, evt.bind(null, client));
            };
        };
        ["guild", "client"].forEach(x => load(x));
    } catch (e) {
        return require("../tools/functions/error")(e, undefined)
    }
};