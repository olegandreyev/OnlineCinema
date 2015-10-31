/**
 * Created by ой on 31.10.2015.
 */


module.exports = function (app) {
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
            console.log(err);
            res.send({status:'error'})
        })
    });

    app.delete('/actors/:id', function (req, res) {
        DB.deleteValueById('actors',req.params.id).then(function (data) {
            if(data) {
                res.send({status: 'ok'})
            }
        }).catch(function (err) {
            console.log(err);
            res.send({status:'error'})
        })
    });

    app.get('/actors/busy', function (req, res) {
        DB.getBusyActors().then(function (data) {
            res.send(data)
        }).catch(function (err) {
            console.log(err);
        })
    });
};
