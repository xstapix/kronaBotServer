const express = require('express')
const axios = require('axios');
const multer = require("multer");

const tgBot = require("./components/bot/index.js")
const config = require('./config/serverConfig.js')

const app = express()
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // '/files' это директория в которую будут сохранятся файлы 
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
// Возьмем оригинальное название файла, и под этим же названием сохраним его на сервере
    const { originalname } = file
    cb(null, originalname)
  }
})
const upload = multer({ storage: storage });

const url = 'https://kronadev.ru/api_2/'

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", config.header.ACA_Origin);
  res.header("Access-Control-Allow-Credentials", config.header.ACA_Credentials);
  res.header("Access-Control-Allow-Methods", config.header.ACA_Methods);
  res.header("Access-Control-Allow-Headers", config.header.ACA_Headers);
  res.header("Content-Type", config.header.Content_Type)
  next();
});

app.post('/', (req, res) => {
  let data;
  let clearData
  
  req.on("data", chunk => {
    data += chunk;
  });

  req.on("end", async () => {
    if (data) { 
      clearData = JSON.parse(data.replace('undefined', ''))
      
      if (clearData.method === 'sendTextMessageBot') {
        console.log('sendTextMessageBot');
        console.log(clearData);
        
        const chat_id_list = await axios.get('https://6392fd90ab513e12c5ff47f0.mockapi.io/properties')
        console.log(chat_id_list.data);

        if (clearData.option === 'Всем') {
          chat_id_list.data.map(async(objChat) => {
            await axios.post(`https://api.telegram.org/bot6010251648:AAGMmNN6WO3uswC9nUyNIXUX6nmXjjytZEw/sendMessage`, {
              chat_id: objChat.chat_id,
              text: clearData.text
            })
          })
        } else {
          chat_id_list.data.map(async(objChat) => {
            if (!objChat.active) {
              await axios.post(`https://api.telegram.org/bot6010251648:AAGMmNN6WO3uswC9nUyNIXUX6nmXjjytZEw/sendMessage`, {
                chat_id: objChat.chat_id,
                text: clearData.text
              })
            }
          })
        }
      }

      if (clearData.method === 'addStar') {
        const answer = await axios.post(url, clearData)
        console.log(clearData);
      }

      if (clearData.method === 'changeUserEmail') {
        const answer = await axios.post(url, clearData)
        console.log(clearData);
      }

      if (clearData.method === 'changeTg') {
        const answer = await axios.post(url, clearData)
        console.log(clearData);
      }

      if (clearData.method === 'addFreeMonth') {
        const answer = await axios.post(url, clearData)
        console.log(clearData);
      }

      if (clearData.method === 'unbanUser') {
        const answer = await axios.post(url, clearData)
        console.log(clearData);
      }

      if (clearData.method === 'banUser') {
        const answer = await axios.post(url, clearData)
        console.log(clearData);
      }

      if (clearData.method === 'dateRangeMessage') {
        console.log(clearData);
        const listWithDate = await axios.get('https://6392fd90ab513e12c5ff47f0.mockapi.io/peopleVSU')

        let arrDate = clearData.date_start.split('.');
        [arrDate[1], arrDate[0]] = [arrDate[0], arrDate[1]]
        
        let currectDate = arrDate.join('.')
        clearData.date_start = new Date(currectDate)

        arrDate = clearData.date_end.split('.');
        [arrDate[1], arrDate[0]] = [arrDate[0], arrDate[1]]
        
        currectDate = arrDate.join('.')
        clearData.date_end = new Date(currectDate)

        listWithDate.data.map(user => {
          for (const key in user) {
            if (user[key]) {
              if (key === 'start') {
                user[key].map((date, index) => {
                  let arrDate = date.split('.');
                  [arrDate[1], arrDate[0]] = [arrDate[0], arrDate[1]]
                  
                  let currectDate = arrDate.join('.')

                  user[key][index] = new Date(currectDate)
                })
              }
              if (key === 'end') {
                user[key].map((date, index) => {
                  let arrDate = date.split('.');
                  [arrDate[1], arrDate[0]] = [arrDate[0], arrDate[1]]
                  
                  let currectDate = arrDate.join('.')
                  
                  user[key][index] = new Date(currectDate)
                })
              }
            }
          }
        })

        listWithDate.data.map(async(user) => {
          console.log(user.chat_id);
          if (user.start) {
            if (clearData.option === 'Активным') {
              let lastStart = new Date(user.start.pop())
              let lastEnd = new Date(user.end.pop())
              let passStart = false
              let passEnd = false
              
              if ((lastStart.getTime() <= clearData.date_start.getTime()) && (clearData.date_start.getTime() <= lastEnd.getTime())) {
                console.log('pass stgart:', lastStart);
                passStart = true
              }

              if ((lastStart.getTime() <= clearData.date_end.getTime()) && (clearData.date_end.getTime() <= lastEnd.getTime())) {
                console.log('pass end:', lastEnd);
                passEnd = true
              }

              if (passEnd || passStart) {
                console.log('success');
                await axios.post(`https://api.telegram.org/bot6010251648:AAGMmNN6WO3uswC9nUyNIXUX6nmXjjytZEw/sendMessage`, {
                  chat_id: user.chat_id,
                  text: clearData.text
                })
              }
            }

            if (clearData.option === 'Не активным') {
              let passStart = false
              let passEnd = false

              user.start.map((date, index) => {
                if ((date.getTime() <= clearData.date_start.getTime()) && (clearData.date_start.getTime() <= user.end[index].getTime())) {
                  console.log(index, 'pass stgart:', date);
                  passStart = true
                }
  
                if ((date.getTime() <= clearData.date_end.getTime()) && (clearData.date_end.getTime() <= user.end[index].getTime())) {
                  console.log(index, 'pass end:', user.end[index]);
                passEnd = true
                }
              })

              if (passEnd || passStart) {
                console.log('success');
                await axios.post(`https://api.telegram.org/bot6010251648:AAGMmNN6WO3uswC9nUyNIXUX6nmXjjytZEw/sendMessage`, {
                  chat_id: user.chat_id,
                  text: clearData.text
                })
              }
            }
          }
        })
      }     
    }
  })
})

app.post('/file', upload.array("file"), async (req, res) => {
  let filedata = req.files;
  let bodydata = req.body;

  if (bodydata.method === 'sendTextAndImgMessageBot') {
    const chat_id_list = await axios.get('https://6392fd90ab513e12c5ff47f0.mockapi.io/properties')
    console.log(filedata);
    if (filedata.length > 0) {
      const paramsObj = { 
        media: []
      }

      filedata.map((obj, index) => {
        paramsObj.media.push({
          type: 'photo',
          media: `file:///C:/projects/tg%20bot/uploads/${obj.originalname}`
        })
      })

      if (bodydata.text !== 'null') {
        paramsObj.media[0].caption = bodydata.text
      }

      console.log(paramsObj);

      chat_id_list.data.map(async(objChat) => {
        if (objChat.active) { 
          paramsObj.chat_id = objChat.chat_id
          await axios.post(`https://api.telegram.org/bot6010251648:AAGMmNN6WO3uswC9nUyNIXUX6nmXjjytZEw/sendMediaGroup`, paramsObj)
        }
      })
    } else {
      chat_id_list.data.map(async(objChat) => {
        await axios.post(`https://api.telegram.org/bot6010251648:AAGMmNN6WO3uswC9nUyNIXUX6nmXjjytZEw/sendMessage`, {
          chat_id: objChat.chat_id,
          text: bodydata.text
        })
      })
    }
  }
})

app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`)
})

tgBot.initBot()