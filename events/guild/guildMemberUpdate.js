module.exports = (client, oldMember, newMember) => {
  if(newMember.roles.cache.has("937101622847373322") && newMember.roles.cache.hasAny(["763149761225687060", "766059605519892491", "823277690840023040", "761483126181462018", "784470417078485032", "820904733455024141", "784296740937138196", "760372254143283230", "785732940054659074"])){
    return newMember.roles.remove('937101622847373322');
  }
}