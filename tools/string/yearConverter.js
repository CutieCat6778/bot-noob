module.exports = (year) => {
	if(year == 0 || !year){
		return 0;
	}
	if(year > 1000){
		year = year+"";
		year = year.slice(2);
		if(year < 10){
			return `200${year}`
		}else if(year < 20 && year > 9){
			return `20${year}`;
		}else if(year > 20){
			return `19${year}`;
		}
	}else if(year < 1000){
		if(year < 10){
			return `200${year}`
		}else if(year < 20 && year > 9){
			return `20${year}`;
		}else if(year > 20){
			return `19${year}`;
		}
	}

}