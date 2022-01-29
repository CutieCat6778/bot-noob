const Room = require('../../models/rooms.js');

module.exports = async (id, data) => {
    await Room.updateOne({_id: id}, data)
    return Room;
}