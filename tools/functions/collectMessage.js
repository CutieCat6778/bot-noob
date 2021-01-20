module.exports = async(message, filter, time, dmChannel) => {
	if(!dmChannel){
	    obj = {
	        max: 1
	    }
	    if(time) obj.time = time;
	    const filte = m => m.author.id == message.author.id;
	    let collected = await message.channel.awaitMessages(filte, obj);
	    if(!collected) return message.channel.send("Didn't recived any messages");
	    if (collected.first().content.toString().toLowerCase() == "cancel") return null;
	    return collected.first() ? collected.first() : collected;
	}else if(dmChannel){
	    obj = {
	        max: 1
	    }
	    if(time) obj.time = time;
	    const filte = m => m.author.id == dmChannel.recipient.id;
	    let collected = await dmChannel.awaitMessages(filte, obj);
	    if(!collected) return dmChannel.send("Didn't recived any messages");
	    if (collected.first().content.toString().toLowerCase() == "cancel") {
			return null;
		}
	    return collected.first() ? collected.first() : collected;		
	}

}