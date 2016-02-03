var express = require('express');
var app = express();
var fs = require('fs');

app.get('/users', function(req, res) {
  fs.readFile(__dirname + '/json/users.json', 'utf8', function(err, data) {
    console.log(data);
    res.end(data);
  });
});

var server = app.listen(1111, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Test app listening at http://%s:%s', host, port);
});
