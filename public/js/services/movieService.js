/**
 * Created by ой on 25.10.2015.
 */
module.exports= function (app) {

    app.factory('movieService',['$http', function ($http) {
        return {
            getGenres: function () {
                return $http.get('/genres')
            },
            getCountries: function () {
                return $http.get('/countries')
            },
            getDirectors: function () {
                return $http.get('/directors')
            },
            removeDirector: function (id) {
              return $http.delete('/directors/'+id)
            },
            getAllMovies: function () {
                return $http.get('/movies')
            },
            getMovieData: function (type) {
              return $http.get('/movies/data/'+type)
            },
            removeMovie: function (id) {
              return $http.delete('/movies/'+id)
            },
            addMovie: function (movieData,movieActors) {
                return $http.post('/movies',{movie:movieData,actors:movieActors})
            },
            getAllActors: function () {
                return $http.get('/actors')
            },
            getMoviesByGenre: function (genreId) {
                return $http.get('/movies/'+genreId)
            },
            getMovieBySearch: function (type,string) {
                return $http.get('/movies/search?'+type+'='+string)
            },
            getMovieById: function (id) {
                return $http.get('movies/watch/'+id)
            },
            getActorsFromMovie: function (id) {
                return $http.get('/movies/'+id+"/actors")
            },
            createDirector: function (director) {
                return $http.post('/directors', director)
            },
            updateDirector: function (director) {
              return $http.put('/directors',director)
            },
            createCountry: function (country) {
                return $http.post('/countries',country)
            },
            updateCountry: function (country) {
                return $http.put('/countries',country)
            },
            removeCountry: function (id) {
                return $http.delete('/countries/'+id)
            },
            createActor: function (actor) {
                return $http.post('/actors',actor)
            },
            updateActor: function (actor) {
               return $http.put('/actors',actor)
            },
            removeActor: function (id) {
                return $http.delete('/actors/'+id)
            }
        };
    }])

}