const express = require('express');
const cors = require('cors');

module.exports = (client) => {
  const app = express();

  app.use(cors({
    origin: function(origin, callback){
      return callback(null, true);
    }
  }));

  app.get('/status', (req, res) => {
    //721203266452586507 //762749432658788384
    const user = client.guilds.cache.get('721203266452586507')?.members.cache.get('762749432658788384');
    console.log(user);
    if(user){
        const data = user.presence?.activities;
        return res.json(data ? data : null);
    }
  })

  app.listen(process.env.PORT || '3000');
}