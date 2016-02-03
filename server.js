var express = require('express');
var app = express();
var fs = require('fs');
// Heroku's config parameter HEROKU gets set when running on Heroku, otherwise assume locally running
var heroku = process.env.HEROKU || false;

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/json/users.json', 'utf8', function(err, data) {
    console.log(data);
    res.end(data);
  });
});

app.get('/users', function(req, res) {
  fs.readFile(__dirname + '/json/users.json', 'utf8', function(err, data) {
    console.log(data);
    res.end(data);
  });
});

if ( heroku ) {
  var server = app.listen(1111, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Test app listening at http://%s:%s', host, port);
  });
}
