module.exports = async (client,member) => {
    const data = await require('../../tools/database/getLevel')(member.id);
    if(data){
        data.server.leave.push(new Date().getTime());
        data.updates.push(new Date().getTime());
        await data.save();
    }
}