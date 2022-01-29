const Room = require('../../models/rooms.js');

module.exports = async(client) => {
	const rooms = await Room.find().catch(e => require('../functions/error.js')(e));
	if(!rooms) return;
	else if(rooms){
		for(let room of rooms){
			console.log(room);
			client.channels.cache.get(room._id) ? client.voices.set(room._id, room) : null;
		}
		return true;
	}
}