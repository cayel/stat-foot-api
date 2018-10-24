var express = require('express');
var cors = require('cors');
var app = express();
var Ranking = require ('./ranking');
var swaggerUi = require('swagger-ui-express'),

PORT = process.env.PORT || 5000

swaggerDocument = require('./swagger.json');

app.use(cors())

async function loadLeagueSeason(season) {
  var jsonContent = require("./data/france.json");
  var arrayFound = jsonContent.filter(function(item) {
    return item.Season == season-1;
  });
  return arrayFound;
}

async function getRanking(arrayFound) {
  var ranking = new Ranking();
  for(i = 0; i< arrayFound.length; i++){ 
    ranking.addFeature(arrayFound[i].home,arrayFound[i].visitor, arrayFound[i].hgoal, arrayFound[i].vgoal);
  }          
  return ranking;
}

async function order(ranking) {
  ranking.rank();
  return ranking;
}

async function evalLeagueRanking(season) {
  const leagueSeason = await loadLeagueSeason(season);
  const leagueRanking = await getRanking(leagueSeason);
  const orderedLeagueRanking = await order(leagueRanking);
  return orderedLeagueRanking;
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/ranking', function (req, res) {
  var season = req.query.season;
  evalLeagueRanking(season).then( r => res.json(r));
});

var server = app.listen(PORT, function () {

  console.log('Listening at port %s', PORT);

});