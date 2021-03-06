var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');
var mime = require('mime');


var handleError = function (err, res) {
  res.writeHead(404);
  res.end();
}

var server = http.createServer(function (req, res) {
  console.log('Responding to a request.');
  // var url = req.url;

  // var filename = 'index.html';
  // if (url.length > 1) {
  //   filename = url.substring(1);
  // }
  // console.log(filename);
  // var filePath = path.resolve(__dirname, 'app', filename);
  var filePath = extract(req.url);
  var fileType = mime.lookup(filePath);

  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.setHeader('Content-Type', fileType);
      res.end(data);
    }
  });

});
server.listen(3000);
