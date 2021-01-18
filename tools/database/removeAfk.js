const Afk  = require('../../models/afk.js');

module.exports = async(id) => {
	try{
		const afk = await Afk.findOne({_id: id}).catch(e => require('../functions/error')(e));
		afk.remove()
		return true
	}catch(e){
		return require('../functions/error')(e);
	}
}