module.exports = {
  config: {
      name: "vcname",
      perms: ['SEND_MESSAGES'],
      bot: ['SEND_MESSAGES'],
      aliases: ['vcsetname', 'vcn', 'vcten', 'vcdoiten'],
      category: "voice",
      usage: ['[name]']
  },
  async execute(client, message, args, guildCache) {
      try{
          if(!message.member.voice.channel) return message.reply('bạn phải ở trong voice!');
          if(!args[0]) return message.reply('xin thí chủ cho địa điểm (europe, brazil, hong kong, india, japan, rotterdam, russia, singapore, sydney');
          const name = args.join(' ');
          await message.member.voice.channel.setName(name);
          return message.react('<:hmmmmm:770520614444335104>')
      }catch(e) {
          return require('../../tools/functions/error')(e, message);
      }
  }
} 