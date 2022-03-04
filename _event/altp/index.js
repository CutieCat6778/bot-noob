const { Collection, Permissions } = require('discord.js');

module.exports = class Event {
	constructor(Client, Message) {
		this.client = Client;
		this.message = Message;
		this.players = new Collection();
		this.currentQuestionPos = 0;
		this.currentQuestion = {};
		this.blockList = Client.eventBlocklist;
		this.questions = require('./data.json');
	}

	delay(ms) {
  		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async start() {
		// Sending message
		const embed = {
			"title": "Ai là người thông minh nhất!",
			"description": "Trò chơi sẽ bắt đầu trong 30s, hãy react 👍 để có thể tham gia nào!!!",
			"timestamp": new Date(),
			"footer": {
				"text": "Cán bộ Gà",
				"icon_url": this.client.user.displayAvatarURL()
			}
		}
		const message = await this.message.channel.send({embeds: [embed]});
		message.react("👍");

		// Collector
		const filter = (reaction, user) => reaction.emoji.name == "👍" && !this.blockList.includes(user.id) && !user.bot;
		const collector = message.createReactionCollector({filter, time: 2000});
		embed.description += "\n\n**Người chơi:**\n";
		collector.on('collect', (r, u) => {
			if(this.players.get(u.id)) return;
			embed.description += `<@${u.id}>`;
			this.players.set(u.id, []);
			message.edit({embeds: [embed]});
		})

		collector.on('end', collected => {
			message.delete();
			this.confirm();
		})
	}

	async confirm() {
		const endedEmbed = {
			"title": `Hú hú, đã có khoảng ${this.players.size} người chơi!`,
			"description": "Trò chơi sẽ bắt đầu trong vài giầy, hãy cố gắng để thắng nào!!!",
			"timestamp": new Date(),
			"footer": {
				"text": "Cán bộ Gà",
				"icon_url": this.client.user.displayAvatarURL()
			}
		}

		const endedMessage = await this.message.channel.send({embeds: [endedEmbed]});
		endedMessage.react("✅");
		const filter = (reaction, user) => reaction.emoji.name == "✅" && (this.message.guild.members.cache.get(user.id).permissions.has(Permissions.FLAGS["MANAGE_GUILD"]) || user.id === "924351368897106061")  && !user.bot;
		const collector2 = endedMessage.createReactionCollector({filter, time: 2000});
		collector2.on('collect', async (r, u) => {
			endedMessage.delete();
			await this.delay(1000);
			this.counter();
		})
	}

	wait(embed, message, counter) {
		embed.title = "Bắt đầu trong " + counter + "giây!";
		message.edit({embeds: [embed]});
		counter--;
		return setTimeout(() => {
			if(counter == 0) {
				message.delete();
				return this.main();
			}
			else if(counter > 0) return this.wait(embed, message, counter);
		}, 1000)
	}

	async counter() {
		const guide = {
			"title": "Hướng dẫn chơi game!",
			"description": `Mỗi câu hỏi sẽ có 4 đáp án, khi trả lời thì hãy viết vào chat đáp án của mình với những ký tự như là **\`1\`**, **\`2\`**, **\`3\`**, **\`4\`** hoặc là **\`a\`**, **\`b\`**, **\`c\`**, **\`d\`**. Điểm sẽ được tính bởi tốc độ và độ chính xác của câu hỏi, cho nên hãy bật mạng của mình cho lên đi. Mạng kém thì nghỉ mẹ đi :>`,
			"timestamp": new Date(),
			"footer": {
				"text": "Cán bộ Gà",
				"icon_url": this.client.user.displayAvatarURL()
			}
		};

		await this.message.channel.send({embeds: [guide]});

		const embed = {
			"title": "Trò chơi bắt đầu!",
			"description": `Số người chơi là: ${this.players.size}\n\n**Mọi người chơi hãy chuẩn bị, căng cơ mông, gồng cơ não để trở thành nhà vô đich nào!**`,
			"timestamp": new Date(),
			"footer": {
				"text": "Cán bộ Gà",
				"icon_url": this.client.user.displayAvatarURL()
			}
		}

		const message = await this.message.channel.send({embeds: [embed]});
		let counter = 5;
		return this.wait(embed, message, counter);
	}

	shuffle(array) {
	  let currentIndex = array.length,  randomIndex;

	  // While there remain elements to shuffle...
	  while (currentIndex != 0) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex--;

	    // And swap it with the current element.
	    [array[currentIndex], array[randomIndex]] = [
	      array[randomIndex], array[currentIndex]];
	  }

	  return array;
	}

	async ask(data) {
		const falseAns = this.shuffle(data.false);
		let answer = [...falseAns.slice(0, 3)];
		answer.push(data.correct);
		answer = this.shuffle(answer);
		console.log(answer);
		const embed = {
			"title": data.content,
			"description": "Đọc kỹ và trả lời đúng nhá các bạn :>\n\n",
			"fields": [
				{
					"name": "Đáp án A",
					"value": answer[0],
					"inline": true,
				},
				{
					"name": "Đáp án B",
					"value": answer[1],
					"inline": true,
				},
				{
					name: '\u200b',
					value: '\u200b',
					inline: false,
				},
				{
					"name": "Đáp án C",
					"value": answer[2],
					"inline": true,
				},
				{
					"name": "Đáp án D",
					"value": answer[3],
					"inline": true,
				},
			],
			"timestamp": new Date(),
			"footer": {
				"text": "Cán bộ Gà",
				"icon_url": this.client.user.displayAvatarURL()
			}
		}
		const question = this.message.channel.send({embeds: [embed]});
		const alert = await this.message.channel.send("**10 giây để đọc câu hỏi bắt đầu!!!!! Trả lời sớm thì ngu vcl, để người khác biết đáp án**");
		setTimeout(() => {
			alert.delete();
			const answerAlert = this.message.channel.send("**Trả lời** (10s sẽ đóng)\n------------------------");
		}, 10000)
	}

	async main() {
		const questions = this.shuffle(this.questions);
		const question = questions.shift();
		return this.ask(question);
	}
}