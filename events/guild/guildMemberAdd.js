module.exports = (client, member) => {
	const channel = member.guild.channels.cache.get('721203266892988489');
	if(member.id == "601204554381656064"){
		const text = `Châm ơi\n Em xin lỗi :((, đừng thoát server nữa.\n Đừng có dỗi bất thình lình nữa :((\n Ở lại server đi, dừng có đi đâu nữa )):\n Thế nhá, ở lại server đi nhá :))\n Ngoan lắm!`
		member.send(text);
		return channel.send(`<@601204554381656064> chào mừng quay trở lại! <@762749432658788384> nói là **Xin lỗi chị, đừng out server nữa <:tymtui:785751845787140106>**`)
	}
	const text = `Chào mừng ${member} đã đến với **Noobs server**!`;
	return channel.send(text);
}