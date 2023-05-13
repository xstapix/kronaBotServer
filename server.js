const express = require('express')
const axios = require('axios');
const multer = require("multer");

const tgBot = require("./components/bot/index.js")
const config = require('./config/serverConfig.js')

const app = express()
const upload = multer({ dest: "uploads/" });

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
      }     
    }
  })
})

app.post('/file', upload.array("file"), async (req, res) => {
  let filedata = req.files;
  let bodydata = req.body;

  if (bodydata.method === 'sendTextAndImgMessageBot') {
    const chat_id_list = await axios.get('https://6392fd90ab513e12c5ff47f0.mockapi.io/properties')
    const formdata = new FormData()
    
    if (filedata.length > 0) {
      const paramsObj = {}
      formdata.append('text', bodydata.text)
      formdata.append('method', bodydata.method)
      
      for (let i = 0; i < filedata.length; i++) {
        formdata.append('file', filedata[i])
      }

      const list_url = await axios.get('https://6392fd90ab513e12c5ff47f0.mockapi.io/location', formdata)
      
      list_url.data.map(obj => {
        obj.type = "photo"
      })

      if (bodydata.text !== 'null') {
        list_url.data[0].caption = bodydata.text
      }

      paramsObj.media = list_url.data

      chat_id_list.data.map(async(objChat) => {
        if (objChat.active) { 
          paramsObj.chat_id = objChat.chat_id
          console.log(paramsObj);
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