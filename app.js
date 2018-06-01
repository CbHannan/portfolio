const express = require('express');
const bodyParser = require('body-parser');
var message = require('./routes/message');
var logger = require('morgan');
var path = require('path');
var message = require('./routes/message');
var initFolder = './src/assets/videos';

const app = express(); 
app.listen(process.env.PORT || 5000);
var cors = require('cors');

var mimeNames = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.ogg': 'application/ogg',
  '.ogv': 'video/ogg',
  '.oga': 'audio/ogg',
  '.txt': 'text/plain',
  '.wav': 'audio/x-wav',
  '.webm': 'video/webm'
};

function httpListener(request, response) {
  // We will only accept 'GET' method. Otherwise will return 405 'Method Not Allowed'.
  if (request.method != 'GET') {
    sendResponse(response, 405, { 'Allow': 'GET' }, null);
    return null;
  }

  var filename =
    initFolder + url.parse(request.url, true, true).pathname.split('/').join(path.sep);

  var responseHeaders = {};
  var stat = fs.statSync(filename);

  // Check if file exists. If not, will return the 404 'Not Found'. 
  if (!fs.existsSync(filename)) {
    sendResponse(response, 404, null, null);
    return null;
  }
  responseHeaders['Content-Type'] = getMimeNameFromExt(path.extname(filename));
  responseHeaders['Content-Length'] = stat.size; // File size.

  sendResponse(response, 200, responseHeaders, fs.createReadStream(filename));
}

function sendResponse(response, responseStatus, responseHeaders, readable) {
  response.writeHead(responseStatus, responseHeaders);

  if (readable == null)
    response.end();
  else
    readable.on('open', function () {
      readable.pipe(response);
    });

  return null;
}

function getMimeNameFromExt(ext) {
  var result = mimeNames[ext.toLowerCase()];

  // It's better to give a default value.
  if (result == null)
    result = 'application/octet-stream';

  return result;
}
app.use(httpListener);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('*', express.static(path.join(__dirname, 'dist')));
app.use('/api/message', message);
app.use(cors({
  origin: true,
  credentials: true
}));

