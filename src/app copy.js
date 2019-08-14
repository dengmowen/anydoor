const http = require("http");
const chalk = require('chalk');
const conf = require('./config/serverConfig');
const path = require('path');
const fs = require('fs');
const server = http.createServer((req, res) => {
  // 获取当前文件夹
  const url = req.url;
  const filePath = path.join(conf.root,url);
  fs.stat(filePath,(err,stats)=>{
    if(err) {
      res.statusCode = 404;
      res.setHeader('content-Type', 'text/plain');
      res.end(`${filePath} is not a directory on this path`);
      return;
    }
    if(stats.isFile()) {
      res.statusCode = 200;
      res.setHeader('content-Type', 'text/plain');
    //   fs.readFile(filePath, 'utf8', (err, data) => {
    //     if (err) {
    //         throw err;
    //     } else {
    //         res.end(data);
    //     }
    // });
      fs.createReadStream(filePath).pipe(res);
      
    } else if (stats.isDirectory()){
      fs.readdir(filePath, (err, files) => {
        if (err) {
          throw err;
        } else {
          res.statusCode = 200;
          res.setHeader('content-Type', 'text/plain');
          res.end(files.join(','));
        }
    });
    }
  });
    // console.log(process);
    // res.statusCode = 200;
  //   res.setHeader('content-Type', 'text/plain');
    // res.setHeader('content-Type', 'text/html');
    // res.write('<html>');
    // res.write('<body>');
    // res.write('Hello node');
    // res.write('</body>');
    // res.writable('</html>');
    // res.end('</html>');

});

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.log(`Serve is Run at ${chalk.green(addr)}`);
});
