const Room = require('../../models/rooms.js');

module.exports = async(client) => {
	const rooms = await Room.find().catch(e => require('../functions/error.js')(e));
	if(!rooms) return;
	else if(rooms){
		for(let room of rooms){
			client.voices.set(room._id, room);
		}
		return true;
	}
}