/**
 * Created by ой on 31.10.2015.
 */
module.exports = function (app) {
    var DB = require('./DBHelper');

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
            console.log(err);
            res.send({status:'error'})
        })
    });

    app.put('/directors', function (req, res) {
        DB.updateDirector(req.body).then(function (data) {
            if(data){
                res.send({status:'ok'})
            }
        }).catch(function (err) {
            console.log(err);
            res.send({status:'error'})
        })
    });
    app.delete('/directors/:id', function (req, res) {
        DB.deleteValueById('directors',req.params.id).then(function (data) {
            if(data){
                res.send({status:'ok'})
            }
        }).catch(function (err) {
            console.log(err);
            res.send({status:'error'})
        })
    });

}