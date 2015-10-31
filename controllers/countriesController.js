/**
 * Created by ой on 31.10.2015.
 */

module.exports = function (app) {
    var DB = require('./DBHelper');

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
            console.log(err);
            res.send({status:'error'})
        })
    });

    app.put('/countries', function (req, res) {
        DB.updateCountry(req.body).then(function (data) {
            if(data) {
                res.send({status: 'ok'})
            }
        }).catch(function (err) {
            console.log(err);
            res.send({status:'error'})
        })
    });

    app.delete('/countries/:id', function (req, res) {
        DB.deleteValueById('countries',req.params.id).then(function (data) {
            if(data) {
                res.send({status: 'ok'})
            }
        }).catch(function (err) {
            console.log(err);
            res.send({status:'error'})
        })
    });
}