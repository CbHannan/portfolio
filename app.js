const express = require('express');
const bodyParser = require('body-parser');
var message = require('./routes/message');
var fs = require('fs'),
  http = require('http'),
  url = require('url'),
  path = require('path');

var path = require('path');
var message = require('./routes/message');
http.createServer(function (req, res) {
  if (req.url != "/assets/movies/bg.mp4") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end('<video src="http://localhost:5000/assets/movies/bg.mp4" controls></video>');
  } else {
    var file = path.resolve(__dirname, "bg.mp4");
    fs.stat(file, function (err, stats) {
      if (err) {
        if (err.code === 'ENOENT') {
          // 404 Error if file not found
          return res.sendStatus(404);
        }
        res.end(err);
      }
      var range = req.headers.range;
      if (!range) {
        // 416 Wrong range
        return res.sendStatus(416);
      }
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      }).listen(process.env.PORT || 5000);
    })
  });
const app = express(); 

var cors = require('cors');


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

