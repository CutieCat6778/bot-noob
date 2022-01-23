const axios = require('axios');

const BACKEND_URL = "https://backend-nestjs.vercel.app/user";

module.exports = {
  getUserById: async () => {
    return await axios.get(BACKEND_URL + '/' + id);
  },
}
