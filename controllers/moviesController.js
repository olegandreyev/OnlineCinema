/**
 * Created by ой on 31.10.2015.
 */

module.exports = function (app) {
    var DB = require('./DBHelper');
    var fs = require('fs');

    app.get('/movies', function (req, res) {
        DB.getMovies().then(function (data) {
            res.send(data)
        }).catch(function (err) {
            console.log(err)
        })
    });
    app.get('/movies/data/:type', function (req, res) {
        DB.getIDs('movies',req.params.type).then(function (data) {
            res.send(data)
        }).catch(function (err) {
            console.log(err)
        })
    });

    app.delete('/movies/:id', function (req, res) {
        DB.deleteValueById('movies',req.params.id).then(function (data) {
            console.log(1)
            if(data){
                res.send({status:'ok'})
            }
        }).catch(function (err) {
            console.log(err);
            res.send({status:'error'})
        })
    });

    app.get('/movies/search', function (req, res) {
        DB.getMoviesBySearch(req.query).then(function (data) {
            res.send(data)
        }).catch(function (err) {
            console.log(err)
        })
    });

    app.get('/movies/:genre', function (req, res) {
        var id = req.params.genre;
        DB.getMoviesByGenre(id).then(function (data) {
            res.send(data)
        }).catch(function (err) {
            console.log(err)
        })
    });
    app.get('/movies/watch/:id', function (req, res) {
        DB.getMovieById(req.params.id)
            .then(function (data) {
                res.send(data)
            }).catch(function (err) {
                console.log(err)
            })
    });

    app.get("/movies/:id/actors", function (req, res) {
        DB.getActorsFromMovie(req.params.id).then(function (data) {
            res.send(data)
        }).catch(function (err) {
            console.log(err)
        })
    });

    app.post('/movies',function (req, res) {
        var movie = req.body.movie;
        var actors = req.body.actors;

        var base64Data = movie.poster.replace(/^data:image\/(png||jpeg);base64,/, "");
        var id = Date.now();
        var posterPath = "public/resources/"+id+".png";
        fs.writeFile(posterPath, base64Data, 'base64', function(err) {
            delete movie.poster;
            movie.posterSrc = '/resources/'+id+'.png';
            movie.director = +movie.director;
            movie.country = +movie.country;
            movie.year = +movie.year;
            movie.rating = +movie.rating;
            movie.genre = +movie.genre;
            DB.addMovie(movie,actors).then(function (id) {
                res.send({status:'ok',id:id})
            }).catch(function (err) {
                console.log(err);
                res.send({status:'error'})
            })
        });
    });


}