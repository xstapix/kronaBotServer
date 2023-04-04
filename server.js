const http = require('http');
const url = require('url');
const tgBot = require("./bot")

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers", 'origin, content-type, accept, application/json');
  
  if (req.url === '/api/name') {
    data = JSON.stringify([
      {
        name: 'red'
      },
      {
        name: 'gfgt'
      }
    ])
  }

  console.log(req.data);

  if (req.url === '/api/id') {
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

    res.end()
  }

});
server.listen(8000, 'localhost');

tgBot.initBot()
