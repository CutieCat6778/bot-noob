const { Collection, Permissions, MessageActionRow, MessageButton } = require('discord.js');

module.exports = class Event {
	constructor(Client, Message) {
		this.client = Client;
		this.message = Message;
		this.players = new Collection();
		this.currentQuestionPos = 1;
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
			"description": `Mỗi câu hỏi sẽ có 4 đáp án, và sẽ có 4 nút được hiện ra dưới tin nhắn, tương ứng với 4 đáp án được đưa ra! Điểm sẽ được tính bởi tốc độ và độ chính xác của câu hỏi, cho nên hãy bật mạng của mình cho lên đi. Mạng kém thì nghỉ mẹ đi :>`,
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
		const embed = {
			"title": "10 giây để đọc đáp câu hỏi",
			"description": `**${data.content}**`,
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

		function returnButtonAns(id, correct) {
			return new MessageButton()
				.setCustomId(`answer_${id}`)
				.setLabel(`Đáp án ${id.toUpperCase()}`)
				.setStyle(correct ? "SUCCESS" : "DANGER")
				.setDisabled(true);
		}

		function returnButtonDis(id) {
			return new MessageButton()
				.setCustomId(`answer_${id}`)
				.setLabel(`Đáp án ${id.toUpperCase()}`)
				.setStyle("PRIMARY")
				.setDisabled(true);
		}

		function returnButton(id) {
			return new MessageButton()
				.setCustomId(`answer_${id}`)
				.setLabel(`Đáp án ${id.toUpperCase()}`)
				.setStyle("PRIMARY")
				.setDisabled(false);
		}
		

		const rowDis = new MessageActionRow()
			.addComponents(
				returnButtonDis('a')
			)
			.addComponents(
				returnButtonDis('b')
			)
			.addComponents(
				returnButtonDis('c')
			)
			.addComponents(
				returnButtonDis('d')
			);
		const row = new MessageActionRow()
			.addComponents(
				returnButton('a')
			)
			.addComponents(
				returnButton('b')
			)
			.addComponents(
				returnButton('c')
			)
			.addComponents(
				returnButton('d')
			);

		const rowAns = new MessageActionRow()
			.addComponents(
				returnButtonAns('a', answer[0] == data.correct)
			)
			.addComponents(
				returnButtonAns('b', answer[1] == data.correct)
			)
			.addComponents(
				returnButtonAns('c', answer[2] == data.correct)
			)
			.addComponents(
				returnButtonAns('d', answer[3] == data.correct)
			)

		const question = await this.message.channel.send({embeds: [embed], components: [rowDis], ephemeral: true});
		setTimeout(() => {
			const currentTime = new Date().getTime();
			question.edit({embeds: [embed], components: [row], ephemeral: true});
			const filter = i => i.customId.startsWith('answer_') && this.players.has(i.user.id);
			const collector = question.channel.createMessageComponentCollector({ filter, time: 30000 })

			let collected = 0;

			collector.on('collect', (i) => {
				collected++;
				const time = new Date().getTime();
				const player = this.players.get(i.user.id);
				player.push({
					time: time - currentTime,
					questionPos: this.currentQuestionPos,
					answer: i.customId
				})
				i.deferUpdate();
				if(collected == this.players.size) return collector.stop();
			})

			collector.on('end', (i) => {
				console.log(this.players);
				question.edit({embeds: [
					{
						"title": "Đã kết thúc",
						"description": `Đã nhận được tổng cộng ${i.size} đáp án, sau vài giây sẽ công bố bẳng xếp hạng.`,
						"timestamp": new Date(),
						"footer": {
							"text": "Cán bộ Gà",
							"icon_url": this.client.user.displayAvatarURL()
						}
					}
				], components: [rowAns], ephemeral: true,})
			})
		}, 10000)
	}

	end() {
		this.message.channel.send("CEK!!");
	}

	async main() {
		const questions = this.shuffle(this.questions);
		const question = questions.shift();
		this.currentQuestionPos = question.id;
		return this.ask(question);
	}
}