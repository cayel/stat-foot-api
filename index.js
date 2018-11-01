var express = require('express')
var cors = require('cors')
var morgan = require('morgan')
var bodyParser     =        require("body-parser");
var app = express()
var Ranking = require ('./ranking')
var swaggerUi = require('swagger-ui-express')
const boom = require('boom')

PORT = process.env.PORT || 5000

swaggerDocument = require('./swagger.json');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function loadLeagueSeason(competition, season) {
  var jsonContent;
  if (competition == 1) jsonContent = require("./data/france.json");
  else jsonContent = require("./data/italy.json");
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

async function evalLeagueRanking(competition, season) {
  const leagueSeason = await loadLeagueSeason(competition, season);
  const leagueRanking = await getRanking(leagueSeason);
  const orderedLeagueRanking = await order(leagueRanking);
  return orderedLeagueRanking;
}

async function getHistory(idCompetition, teamHome, teamAway) {
  var jsonContent;
  if (idCompetition == 1) jsonContent = require("./data/france.json");
  else jsonContent = require("./data/italy.json");
  var arrayFound = jsonContent.filter(function(item) {
    return ((item.home == teamHome) && (item.visitor == teamAway));
  });
  return arrayFound;
}

function getCompetitions() {
  return ([
    {
      "id": 1,
      "countryName" : "France",
      "competitionName" : "Ligue 1",
      "seasonMin": 1933,
      "seasonMax": 2017
    },
    {
      "id": 2,
      "countryName" : "Italy",
      "competitionName" : "Serie A",
      "seasonMin": 1935,
      "seasonMax": 2017
    }
  ]);
}

if (app.get('NODE_ENV') === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/ranking', function (req, res, next) {
  var season = req.query.season;
  if (!season) return next(boom.badRequest('missing season'));
  evalLeagueRanking(season).then( r => res.json(r));
});

app.get('/competitions', function (req, res, next) {
  const dataCompetitions = getCompetitions();
  res.json(dataCompetitions);
});

app.get('/competitions/:id/ranking', function (req, res, next) {
  var season = req.query.season;
  var competition = req.params.id;
  if (!season) return next(boom.badRequest('missing season'));
  if (!competition) return next(boom.badRequest('missing competition'));
  evalLeagueRanking(competition,season).then( r => res.json(r))
});

app.post('/matchs/search', function (req, res, next) {  
  try {
    var idCompetition=req.body.idCompetition;
    var teamHome=req.body.teamHome;
    var teamAway=req.body.teamAway;
    if (!idCompetition) return next(boom.badRequest('competition missing'));
    if (!teamHome) return next(boom.badRequest('home team missing'));
    if (!teamAway) return next(boom.badRequest('away team missing'));
    getHistory(idCompetition,teamHome,teamAway).then( r => res.json(r));    
  }
  catch(e) {
    return next(boom.badRequest('bad parameters'));
  }  
});

app.use(function(req, res, next) {
  return next(boom.notFound('Sorry cant find that !'));
});


app.use((err, req, res, next) => {
  if (err.isServer) {
    console.log(req);
  }
  return res.status(err.output.statusCode).json(err.output.payload);
})

var server = app.listen(PORT, function () {

  console.log('Listening at port %s', PORT);

});