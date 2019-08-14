const http = require("http");
const chalk = require('chalk');
const conf = require('./config/serverConfig');
const path = require('path');
const route = require('./helper/route');
const openUrl = require('./helper/openUrl');
// const server = http.createServer((req, res) => {
//   res.setHeader('Access-Control-Allow-Origin','*');
//   // 获取当前文件夹
//   const filePath = path.join(conf.root,req.url);
//   route(req,res,filePath);
// });

// server.listen(conf.port, conf.hostname, () => {
//   const addr = `http://${conf.hostname}:${conf.port}`;
//   console.log(`Serve is Run at ${chalk.green(addr)}`);
// });

class Server {
  constructor(config) {
    this.conf = Object.assign({},conf,config);
  }
  start(){
    const server = http.createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin','*');
      // 获取当前文件夹
      const filePath = path.join(this.conf.root,req.url);
      route(req,res,filePath,this.conf);
    });

    server.listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}`;
      console.log(`Serve is Run at ${chalk.green(addr)}`);
      openUrl(addr);
    });
  }
}
module.exports  = Server;