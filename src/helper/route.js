const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const Handlebars =  require('handlebars');
const mime = require('./mime');
const compress  = require('./compress');
const range = require('./range');
const isFresh = require('./cache');

const tplPath = path.join(__dirname,'./../teamplate/dir.tpl');
const source  = fs.readFileSync(tplPath);
const teamplate  = Handlebars.compile(source.toString());

// const config = require('./../config/serverConfig');
module.exports = async function (req,res,filePath,config){
  try {
    const stats =  await stat(filePath);
    if(stats.isFile()) {
      const contentType  = mime(filePath);
      res.statusCode = 200;
      res.setHeader('content-Type', contentType+';charset=utf-8');
      if(isFresh(stats,req,res)) {
        res.statusCode = 304;
        res.end();
        return;
      }
      // let rs  = fs.createReadStream(filePath);
      let rs;
      const {code,start,end} = range(stats.size,req,res);
      if(code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, {start,end});
      }
      if(filePath.match(config.compress)) {
        rs = compress(rs,req,res);
      }
      rs.pipe(res);
    } else if (stats.isDirectory()){
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('content-Type','text/html;charset=utf-8');
      const dir  = path.relative(config.root,filePath);
      const data  = {
        title: path.basename(filePath),
        dir: dir ?`/${dir}` : '',
        files: files.map(file=> {
          return {
            file,
            icon: mime(file)
          }
        })
      };
      // res.end(files.join(','));
      res.end(teamplate(data));
    }
  } catch(ex) {
    console.error(ex);
    res.statusCode = 404;
    res.setHeader('content-Type', 'text/plain');
    res.end(`${filePath} is not a directory on this path\n ${ex}`);
    return;
  }
};
