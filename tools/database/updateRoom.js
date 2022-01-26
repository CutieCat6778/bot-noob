const Room = require('../../models/rooms.js');

module.exports = async (data) => {
    await Room.updateOne(data)
    return Room;
}