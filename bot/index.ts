const TelegramApi = require("node-telegram-bot-api")
const axios = require("axios")

const token:string = "6010251648:AAGMmNN6WO3uswC9nUyNIXUX6nmXjjytZEw"
const bot:any = new TelegramApi(token, { polling: true })
let now = Date.now();

interface IMsg {
  message_id: number,
  from: {
    id: number,
    is_bot: boolean,
    first_name: string,
    username: string,
    language_code: string
  },
  chat: {
    id: number,
    first_name: string,
    username: string,
    type: string
  },
  date: number,
  text: string,
  entities: [ { offset: number, length: number, type: string } ]
}

exports.initBot = function () {
	bot.on("message", async(msg: IMsg) => {
		const chatId: number = msg.chat.id

		bot.setMyCommands(
			[
				{ command: '/start', description: 'Start work' },
				{ command: '/info', description: 'Print user info' },
				{ command: '/photo', description: 'send more photo' },
				{ command: '/audio', description: 'send audio' },
				{ command: '/location', description: 'send location' },
			]
		)

		if (msg.text === '/start') {
			console.log(msg);
			return bot.sendPhoto(
				chatId,
				'https://tlgrm.eu/_/stickers/099/070/09907000-0320-3183-b3f9-3082284c5df9/192/1.webp', {
					caption: `Hello ${msg.from.first_name}`
				}
			)
		}

		if (msg.text === '/info') {
			return bot.sendMessage(chatId,
				`id: ${msg.from.id} \nis_bot: ${msg.from.is_bot} \nfirst_name: ${msg.from.first_name} \nusername: ${msg.from.username} \nlanguage_code: ${msg.from.language_code}`
			)
		}

		if (msg.text === '/photo') {
			return bot.sendMediaGroup(chatId, 
				[
					{
						type: "photo",
						media: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'
					},
					{
						type: "photo",
						media: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg'
					},
					{
						type: "photo",
						media: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg'
					}
				]
			)
		}

		if (msg.text === '/audio') {
			return bot.sendAudio(chatId, 'http://www.largesound.com/ashborytour/sound/brobob.mp3',
			{
				caption: 'test audio'
			})
		}

		if (msg.text === '/location') {
			return bot.sendLocation(
				chatId,
				51.521727,
				-0.117255
			)
		}

		return bot.sendMessage(chatId, 'Я тебя не понял')
	})

	setInterval(() => {
		if (Date.now() > now + 600000) {
			bot.sendMessage(1226355897, 'прошело 10 минут')
			now = Date.now();
		}
	}, 1000);
}

exports.happyBirthday = function (chatId) {
	bot.sendMessage(chatId, 'happyBirthday')
}
