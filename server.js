/**
 * Created by ой on 24.10.2015.
 */
var express = require('express');
var bodyParser = require('body-parser');



var app = express();

app.use(express.static('public'));
app.use(bodyParser.json({limit: '32mb'}));
app.use(bodyParser.urlencoded({limit: '32mb', extended: true}));


require('./controllers/actorsController')(app);
require('./controllers/countriesController')(app);
require('./controllers/directorsController')(app);
require('./controllers/moviesController')(app);
require('./controllers/genresController')(app);






app.listen(8080);