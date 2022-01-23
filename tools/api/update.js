const axios = require('axios');

const BACKEND_URL = "https://backend-nestjs.vercel.app/update";

module.exports = {
  getUpdatesToday: async () => {
    return await axios.get(BACKEND_URL);
  },

  getUpdatesByDay: async (day) => {
    return await axios.get(BACKEND_URL + '/' + day);
  },

  getUpdatesByDayAndMonth: async (day, month) => {
    return await axios.get(`${BACKEND_URL}/${day}/${month}`);
  },

  getUpdatesByDate: async (day, month, year) => {
    return await axios.get(`${BACKEND_URL}/${day}/${month}/${year}`);
  },

  getUpdatesThisWeek: async () => {
    return await axios.get(`${BACKEND_URL}/week`);
  }
}
