const thinh = require('../../asset/useFullArrays/thathinh.json');

module.exports = async (client) => {
    const send = () => {
        const random = Math.floor(Math.random() * thinh.length);
        const guild = client.guilds.cache.get('721203266452586507');
        const channel = guild.channels.cache.get('721203266892988489');
        channel.send(thinh[random]);
    }
    send();
    client.setInterval(() => {
        send();
    }, 1800000);
}