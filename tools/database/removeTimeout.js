const Afk  = require('../../models/timeout.js');

module.exports = async(id) => {
	try{
		const afk = await Afk.findOne({from: id}).catch(e => require('../functions/error')(e));
		afk.remove()
		return true;
	}catch(e){
		return require('../functions/error')(e);
	}
}