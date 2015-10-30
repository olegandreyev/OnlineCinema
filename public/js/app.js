/**
 * Created by �� on 25.10.2015.
 */

var app = angular.module('OnlineCinema',['ngRoute']);
//services
require('./services/movieService')(app);
//controllers
require('./controllers/MovieListCtl')(app);
require('./controllers/WatchCtl')(app);
require('./controllers/DirectorsCtl')(app);
require('./controllers/CountryCtl')(app);
//directives
require('./directives/genresList')(app);
require('./directives/movieList')(app);
require('./directives/back')(app);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'templates/home.html'
            })
            .when('/movies',{
                templateUrl:'templates/movies.html',
                controller:'MovieListCtl'
            })
            .when('/movies/:id',{
                templateUrl:'templates/watch.html',
                controller:'WatchCtl'
            })
            .when('/addDirector',{
                templateUrl:'templates/director.html',
                controller:'AddDirectorCtl'
            })
            .when('/addCountry',{
                templateUrl:'templates/countries.html',
                controller:'AddCountryCtl'
            })
            .otherwise({
                redirectTo:'/'
            })
    }
]);

module.exports = app;