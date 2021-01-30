module.exports = async(client, oldMember, newMember) => {
    if(newMember.id == "601204554381656064"){
        if(oldMember.presence.status != newMember.presence.status){
            const user = await client.users.fetch("762749432658788384");
            user.send(`**Châm** đã chuyển từ trạng thái **${oldMember.presence.status}** sang trạng thái **${newMember.presence.status}**`);
        }
    }
}