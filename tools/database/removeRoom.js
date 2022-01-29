const Room  = require('../../models/rooms.js');

module.exports = async(id) => {
	try{
		const room = await Room.findOne({_id: id}).catch(e => require('../functions/error')(e));
		if(!room) return false;
		if(room) room.remove();
		return true
	}catch(e){
		return require('../functions/error')(e);
	}
}