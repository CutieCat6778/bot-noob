const Afk  = require('../../models/starboard.js');
const getStarboard = require('./getStarboard.js');

module.exports = async(id) => {
	try{
		const afk = await getStarboard(id);
		afk.remove()
		return true
	}catch(e){
		return require('../functions/error')(e);
	}
}