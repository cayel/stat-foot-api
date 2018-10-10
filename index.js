var express = require('express');
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/', function (req, res) {
  var data = {
    "bestAnimals": [
      "wombat",
      "corgi",
      "puffer fish",
      "owl",
      "crow"
    ]
  };

  res.json(data);
});


var server = app.listen(3000, function () {

  var port = server.address().port;

  console.log('Listening at port %s', port);

});