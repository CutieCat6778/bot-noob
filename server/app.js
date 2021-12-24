const express = require('express');
const cors = require('cors');

module.exports = (client) => {
  const app = express();

  const whitelist = ['http://localhost:3001']

  app.use(cors({
    origin: function(origin, callback){
      // allow requests with no origin 
      if(!origin) return callback(null, true);
      if(whitelist.indexOf(origin) === -1){
        var message = 'The CORS policy for this origin doesn\'t ' +
                  'allow access from the particular origin.';
        return callback(new Error(message), false);
      }
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