const ms = require('ms');

module.exports = (time) => {
	if(isNaN(time) == true){
		if(!ms(time)) return undefined;
		else if(ms(time) < 1000) return undefined;
		else return ms(time);
	}else if(isNaN(time) == false){
		time = parseInt(time);
		if(time < 1000) return undefined;
		else return time;
	}
}