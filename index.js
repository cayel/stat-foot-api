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

app.get('/ranking', function (req, res) {
  var season = req.query.season;
  if (season == 2017) {
    var data = {
      "PSG": [1,75,30,6,2,67,34],
      "Olympique Lyonnais": [2,72,28,6,4,73,49],
      "OM": [3,69,27,6,5,49,42]
    };  
  } else if (season == 2016) {
    var data = {
      "PSG": [1,71,30,6,2,67,34],
      "Monaco": [2,65,28,6,4,73,49],
      "Metz": [3,61,27,6,5,49,42]
    };  
  }
  res.json(data);
});

var server = app.listen(3000, function () {

  var port = server.address().port;

  console.log('Listening at port %s', port);

});