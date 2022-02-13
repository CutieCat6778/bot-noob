module.exports = (message, text, boolean) => {
  try{
      message.reply({ content: typeof(text) == "string" ? text : undefined, ...(typeof(text) == "object" ? text : undefined) ,replyTo: boolean ? message.author.id : null, allowedMentions: { repliedUser: boolean ? false : true }}).then(async m => {
          m ? await m.react("🗑️") : null;
          const filter = (reaction, user) => {
              return !user.bot && (reaction.emoji.name === '🗑️' && message.author.id == user.id) || (reaction.emoji.name === "🗑️" && message.member.permissions.has("ADMINISTRATOR"))
          };
          const collector = await m.createReactionCollector(filter, { time: 15000 });
          let trigger = false;
          collector.on("collect", async(reaction, user) => {
              if (reaction.emoji.name == "🗑️" && user.id == message.author.id) {
                  try{
                      const msg = await message.channel.messages.fetch(m.id);
                      msg ? (msg.reactions.removeAll(), msg.delete(), trigger = true) : null
                      collector.stop();
                      return msg;
                  }catch(e){
                      return message.client.error(e, msg);
                  }
              }
          })
          collector.on('end', async(reaction, user) => {
              try{
                  if(!trigger){
                      const msg = await message.channel.messages.fetch(m.id);
                      msg ? (msg.reactions.cache.size > 0 ? msg.reactions.removeAll() : null) : null
                      return msg;
                  }
              }catch(e){
                  message.client.error(e, message);
              }
          })
          return m;
      })
  }catch(e){
      return require('./error')(e, message);
  }
}