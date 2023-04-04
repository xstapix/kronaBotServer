var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var TelegramApi = require("node-telegram-bot-api");
var axios = require("axios");
var token = "6010251648:AAGMmNN6WO3uswC9nUyNIXUX6nmXjjytZEw";
var bot = new TelegramApi(token, { polling: true });
var now = Date.now();
exports.initBot = function () {
    var _this = this;
    bot.on("message", function (msg) { return __awaiter(_this, void 0, void 0, function () {
        var chatId;
        return __generator(this, function (_a) {
            chatId = msg.chat.id;
            bot.setMyCommands([
                { command: '/start', description: 'Start work' },
                { command: '/info', description: 'Print user info' },
                { command: '/photo', description: 'send more photo' },
                { command: '/audio', description: 'send audio' },
                { command: '/location', description: 'send location' },
            ]);
            if (msg.text === '/start') {
                console.log(msg);
                return [2 /*return*/, bot.sendPhoto(chatId, 'https://tlgrm.eu/_/stickers/099/070/09907000-0320-3183-b3f9-3082284c5df9/192/1.webp', {
                        caption: "Hello ".concat(msg.from.first_name)
                    })];
            }
            if (msg.text === '/info') {
                return [2 /*return*/, bot.sendMessage(chatId, "id: ".concat(msg.from.id, " \nis_bot: ").concat(msg.from.is_bot, " \nfirst_name: ").concat(msg.from.first_name, " \nusername: ").concat(msg.from.username, " \nlanguage_code: ").concat(msg.from.language_code))];
            }
            if (msg.text === '/photo') {
                return [2 /*return*/, bot.sendMediaGroup(chatId, [
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
                    ])];
            }
            if (msg.text === '/audio') {
                return [2 /*return*/, bot.sendAudio(chatId, 'http://www.largesound.com/ashborytour/sound/brobob.mp3', {
                        caption: 'test audio'
                    })];
            }
            if (msg.text === '/location') {
                return [2 /*return*/, bot.sendLocation(chatId, 51.521727, -0.117255)];
            }
            return [2 /*return*/, bot.sendMessage(chatId, 'Я тебя не понял')];
        });
    }); });
    setInterval(function () {
        if (Date.now() > now + 600000) {
            bot.sendMessage(1226355897, 'прошело 10 минут');
            now = Date.now();
        }
    }, 1000);
};
exports.happyBirthday = function (chatId) {
    bot.sendMessage(chatId, 'happyBirthday');
};
