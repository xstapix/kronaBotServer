const express = require('express')
const axios = require('axios');
const multer = require("multer");
const url = require('url');

const tgBot = require("./components/bot/index.js")
const config = require('./config/serverConfig.js')

const app = express()
const upload = multer({ dest: "uploads/" });

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
        
        const chat_id_list = await axios.get('https://6392fd90ab513e12c5ff47f0.mockapi.io/location')
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
    console.log(bodydata.method);
    console.log(filedata);
    // const chat_id_list = await axios.get('https://6392fd90ab513e12c5ff47f0.mockapi.io/location')
    
    let x = URL.createObjectURL(filedata[0])

    console.log(x);
    // const paramsObj = {
    //   chat_id: 1226355897,
    //   media: [
    //     {
    //       type: "photo",
    //       media: url.fileURLToPath(filedata[0]),
    //       caption: "clearData.text"
    //     },
    //     {
    //       type: "photo",
    //       media: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'
    //     }
    //   ]
    // }

    // await axios.post(`https://api.telegram.org/bot6010251648:AAGMmNN6WO3uswC9nUyNIXUX6nmXjjytZEw/sendMediaGroup`, paramsObj) 
  }
})

app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`)
})

tgBot.initBot()