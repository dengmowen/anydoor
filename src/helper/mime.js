const path = require('path');

const mimeTypes = {
  'css': 'text/css',
  'html': 'text/html',
  'ico': ' image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpg',
  'png': 'image/png',
  'js': 'text/javascript',
  'json': 'application/json',
  'pdf': 'application/pdf', 
  'txt': 'text/plain',
  'xml': 'text/xml'
};
module.exports = (filePath)=>{
  let ext = path.extname(filePath).split('.').pop().toLowerCase();
  if(!ext) {
    ext = filePath;
  }
  return mimeTypes[ext] || mimeTypes['txt'];
};