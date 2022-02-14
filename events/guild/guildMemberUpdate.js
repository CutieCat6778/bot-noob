module.exports = (client, oldMember, newMember) => {
  console.log(newMember.roles.cache.has("937101622847373322") && newMember.roles.cache.filter(a => (a.color != "#95a5a6" && a.id != "937101622847373322")).size > 1, newMember.roles.cache.filter(a => a.color != "#95a5a6"));
  if(newMember.roles.cache.has("937101622847373322") && newMember.roles.cache.filter(a => (a.color != "#95a5a6" && a.id != "937101622847373322")).size > 1){
    return newMember.roles.remove('937101622847373322');
  } else {
    return newMember.roles.add('937101622847373322');
  }
}
