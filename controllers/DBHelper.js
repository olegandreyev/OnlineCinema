/**
 * Created by �� on 24.10.2015.
 */

var Promise = require('bluebird');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'movies'
});

var getAllMoviesSql = 'SELECT m.id, m.vkSrc, m.title, m.description, c.title AS country,\
           m.fond, m.posterSrc, g.title AS genre, m.year, m.rating, d.fullName AS director FROM movies m\
            INNER JOIN directors d ON m.director = d.id\
            INNER JOIN genres g ON m.genre = g.id\
            INNER JOIN countries c ON m.country = c.id';

var getActorsFromMovie =
    'SELECT group_concat(a.fullName) as actors FROM movieactors ma \
INNER JOIN actors a ON ma.a_id = a.id';

//var groupBy = 'GROUP BY ??';
var DB = {
    getTableValues: function (table) {
        return new Promise(function (res, rej) {
            connection.query('SELECT * FROM ??', [table], function (err, rows, fields) {
                if(err){rej(err);}else{ res(rows)}
            });
        })
    },
    updateCountry: function (data) {
        return new Promise(function (res, rej) {
            connection.query('UPDATE countries SET ? WHERE id = ?', [{title: data.title}, data.id], function (err, rows, fields) {
                if(err){rej(err);}else{ res(rows)}
            })
        })
    },
    deleteValueById: function (table, id) {
        if(table == 'movies'){
            return new Promise(function (res, rej) {
                connection.beginTransaction(function (err) {
                    if(err)rej(err);
                    connection.query('DELETE FROM ?? WHERE id = ?', [table, id], function (err, rows, fields) {
                        if (err){
                            connection.rollback(function (err) {
                                rej(err)
                            })
                        }
                        connection.query('DELETE FROM movieactors WHERE m_id = ?',[id], function (err, rows, fields) {
                            if(err){
                                connection.rollback(function (err) {
                                    rej(err)
                                })
                            }
                            connection.commit(function () {
                                res(rows)
                            })
                        })
                    })
                })
            })
        }else {
            return new Promise(function (res, rej) {
                connection.query('DELETE FROM ?? WHERE id = ?', [table, id], function (err, rows, fields) {
                    if(err){rej(err);}else{ res(rows)}
                })
            })
        }
    },
    getIDs: function (table, type) {
      return new Promise(function (res, rej) {
          connection.query('SELECT ?? FROM ??',[type, table], function (err, rows, fields) {
              if(err){rej(err);}else{ res(rows)}
          })
      })
    },
    getMovies: function () {
        return new Promise(function (res, rej) {
            connection.query(getAllMoviesSql, function (err, rows, fields) {
                if(err){rej(err);}else{ res(rows)}
            })
        })
    },
    getMoviesByGenre: function (id) {
        return new Promise(function (res, rej) {
            connection.query(getAllMoviesSql + " WHERE m.genre = ?", [id], function (err, rows, fields) {
                if(err){rej(err);}else{ res(rows)}
            })
        })
    },
    getMoviesBySearch: function (params) {
        return new Promise(function (res, rej) {
            var column = Object.keys(params)[0];
            var name = "%" + params[column] + "%";
            connection.query(getAllMoviesSql + " WHERE ?? LIKE ?", [column, name], function (err, rows, fields) {
                if(err){rej(err);}else{ res(rows)}
            })
        })
    },
    getMovieById: function (id) {
        return new Promise(function (res, rej) {
            connection.query(getAllMoviesSql + " WHERE m.id = ?", [id], function (err, rows, fields) {
                if(err){rej(err);}else{ res(rows[0])}
            })
        })
    },
    getActorsFromMovie: function (id) {
        return new Promise(function (res, rej) {
            connection.query(getActorsFromMovie + " WHERE ma.m_id = ? ", [id], function (err, rows, fields) {
                if(err){rej(err);}else{ res(rows[0])}
            })
        })
    },
    createDirector: function (director) {
        return new Promise(function (res, rej) {
            connection.query('INSERT INTO directors SET ?', [director], function (err, rows, fields) {
                if(err){rej(err);}else{ res(rows.insertId)}
            })
        })
    },
    updateDirector: function (data) {
        return new Promise(function (res, rej) {
            connection.query('UPDATE directors SET ? WHERE id = ?',
                [{fullName: data.fullName, birthday: data.birthday}, data.id], function (err, rows, fields) {
                    if(err){rej(err);}else{ res(rows)}
                })
        })
    },
    createCountry: function (country) {
        return new Promise(function (res, rej) {
            connection.query('INSERT INTO countries SET ?', [country], function (err, rows, fields) {
                if(err){rej(err);}else{ res(rows.insertId)}
            })
        })
    },
    createActor: function (actor) {
        return new Promise(function (res, rej) {
            connection.query('INSERT INTO actors SET ?', [actor], function (err, rows, fields) {
                if(err){rej(err);}else{ res(rows.insertId)}
            })
        })
    },
    updateActor: function (data) {
        return new Promise(function (res, rej) {
            connection.query('UPDATE actors SET ? WHERE id = ?', [{fullName: data.fullName}, data.id], function (err, rows, fields) {
                if(err){rej(err);}else{ res(rows)}
            })
        })
    },
    getBusyActors: function () {
      return new Promise(function (res, rej) {
          connection.query('SELECT DISTINCT a_id FROM movieactors', function (err, rows, fields) {
              if(err){rej(err);}else{ res(rows)}
          })
      })
    },
    addMovie: function (movie, actors) {
        return new Promise(function (res, rej) {
            connection.beginTransaction(function (err) {
                if (err) {
                    throw err;
                }
                connection.query('INSERT INTO movies SET ?', [movie], function (err, result) {
                    if (err) {
                        connection.rollback(function () {
                            rej(err);
                        });
                    }
                    console.log(result.insertId + ' movie was added');
                    var promises = [];
                    actors.forEach(function (actor) {
                        promises.push(new Promise(function (res, rej) {
                            connection.query('INSERT INTO movieactors SET ?', [{m_id: result.insertId, a_id: +actor}],
                                function (err, result) {
                                    if (err) {
                                        rej(err)
                                    }else{
                                        res(result.insertId)
                                    }
                                });
                        }));
                    });
                    Promise.all(promises).then(function (values) {
                       connection.commit(function () {
                           res(result.insertId)
                       })
                    }).catch(function (err) {
                        connection.rollback(function () {
                            rej(err);
                        });
                    })
                });
            });
        })
    }
};
module.exports = DB;
