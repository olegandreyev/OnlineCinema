/**
 * Created by ой on 24.10.2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest:'resources/'});
var path = require('path');
var fs = require('fs');


var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

var DB = require('./DBHelper');



app.get('/actors', function (req, res) {
    DB.getTableValues('actors').then(function (data) {
        res.send(data)
    }).catch(function (err) {
        console.log(err);
    })
});

app.put('/actors', function (req, res) {
   DB.updateActor(req.body).then(function (data) {
       if(data) {
           res.send({status:'ok'});
       }
   }).catch(function (err) {
       console.log(err);
   })
});
app.post('/actors', function (req, res) {
    DB.createActor(req.body).then(function (id) {
        if(id) {
            res.send({status: 'ok',id:id})
        }
    }).catch(function (err) {
        res.send({status:'error'})
    })
});

app.delete('/actors/:id', function (req, res) {
    DB.deleteValueById('actors',req.params.id).then(function (data) {
        if(data) {
            res.send({status: 'ok'})
        }
    }).catch(function (err) {
        res.send({status:'error'})
    })
});

app.get('/countries', function (req, res) {
    DB.getTableValues('countries').then(function (data) {
      res.send(data)
    }).catch(function (err) {
        console.log(err);
    })
});

app.post('/countries', function (req, res) {
    DB.createCountry(req.body).then(function (id) {
        if(id) {
            res.send({status: 'ok',id:id})
        }
    }).catch(function (err) {
       res.send({status:'error'})
    })
});

app.put('/countries', function (req, res) {
    DB.updateCountry(req.body).then(function (data) {
        if(data) {
            res.send({status: 'ok'})
        }
    }).catch(function (err) {
        res.send({status:'error'})
    })
});

app.delete('/countries/:id', function (req, res) {
    DB.deleteValueById('countries',req.params.id).then(function (data) {
        if(data) {
            res.send({status: 'ok'})
        }
    }).catch(function (err) {
        res.send({status:'error'})
    })
});

app.get('/genres', function (req, res) {
    DB.getTableValues('genres').then(function (data) {
        res.send(data)
    }).catch(function (err) {
        console.log(err)
    })
});

app.get('/directors', function (req, res) {
    DB.getTableValues('directors').then(function (data) {
        res.send(data)
    }).catch(function (err) {
        console.log(err)
    })
});

app.post('/directors', function (req, res) {
    DB.createDirector(req.body).then(function (data) {
        if(data){
            res.send({status:'ok'})
        }
    }).catch(function (err) {
        res.send({status:'error'})
    })
});

app.put('/directors', function (req, res) {
    DB.updateDirector(req.body).then(function (data) {
        if(data){
            res.send({status:'ok'})
        }
    }).catch(function (err) {
        res.send({status:'error'})
    })
});
app.delete('/directors/:id', function (req, res) {
    DB.deleteValueById('directors',req.params.id).then(function (data) {
        if(data){
            res.send({status:'ok'})
        }
    }).catch(function (err) {
        res.send({status:'error'})
    })
})

app.get('/movies', function (req, res) {
    DB.getMovies().then(function (data) {
        res.send(data)
    }).catch(function (err) {
        console.log(err)
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

app.post('/upload', upload.single('poster'),function (req, res) {
    var tempPath = req.file.path,
        targetPath = path.resolve('public/resources/1.png');
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
        });
});






app.listen(8080);