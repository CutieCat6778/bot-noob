const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { MessageAttachment } = require('discord.js');
const { getUpdatesThisWeek } = require('../../tools/api/update');

module.exports = {
  config: {
    name: 'week',
    aliases: ["tuan", "weeks"],
    perms: ["SEND_MESSAGES"],
    category: "chart"
  },
  async execute(client, message, args, guildCache) {
    try {
      const values = [
        0, 0, 0, 0, 0 ,0 ,0
      ];
      const msg = await message.reply('Đang load, đừng hối!!');
      const width = 600;
      const height = 200;
      const backgroundColour = "black";
      const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour});

      const { data } = await getUpdatesThisWeek();
      for (const user of data.data) {
        for (const time of user.time){
          const hour = new Date(time).getHours();
          values[hour]++;
        }
      }
      const chartRes = {
        labels: [
          "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"
        ],
        datasets: [
          {
            fill: true,
            label: 'Người dùng',
            backgroundColor: '#ffffff',
            borderColor: '#bfbfbf',
            data: values,
          },
        ],
      };
      const config = {
        type: "line",
        data: chartRes,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          }
        }
      }
      const buffer = await chartJSNodeCanvas.renderToBuffer(config);
      const image = new MessageAttachment(buffer, 'today.png')
      return msg.edit({files: [image], content: "**Người dùng hoạt động tuần này**"});
    } catch (e) {
      return require('../../tools/functions/error')(e, message);
    }
  }
}