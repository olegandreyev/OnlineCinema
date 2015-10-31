/**
 * Created by ой on 31.10.2015.
 */
module.exports = function (app) {
    var DB = require('./DBHelper');

    app.get('/genres', function (req, res) {
        DB.getTableValues('genres').then(function (data) {
            res.send(data)
        }).catch(function (err) {
            console.log(err)
        })
    });
};