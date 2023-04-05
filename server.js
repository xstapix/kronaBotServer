const http = require('http');
const tgBot = require("./components/bot")

const config = require('./config/serverConfig')

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", config.header.ACA_Origin);
  res.setHeader("Access-Control-Allow-Credentials", config.header.ACA_Credentials);
  res.setHeader("Access-Control-Allow-Methods", config.header.ACA_Methods);
  res.setHeader("Access-Control-Allow-Headers", config.header.ACA_Methods);
  res.setHeader("Content-Type", config.header.Content_Type)

  let data;
  
  req.on("data", chunk => {
    data += chunk;
  });

  req.on("end", () => {
    if (data) { 
      let clearData = JSON.parse(data.replace('undefined', ''))
      console.log(clearData);
    }
  });
  if (req.url === '/api/id') {
    res.end(JSON.stringify({status: 200}))
  }

});

server.listen(config.PORT, config.hostName);

tgBot.initBot()
