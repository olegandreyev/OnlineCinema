/**
 * Created by ой on 25.10.2015.
 */
module.exports = function (app) {
    app.directive('movieList', function () {
        return {
            restrict:'E',
            templateUrl:'js/directives/movieList.html',
            scope:{
                movies:'='
            }
        }
    })
};