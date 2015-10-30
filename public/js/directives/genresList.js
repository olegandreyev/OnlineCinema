/**
 * Created by ой on 25.10.2015.
 */

module.exports = function (app) {
    app.directive('genresList', function () {
        return {
            restrict:'E',
            templateUrl:'js/directives/genresList.html'
        }
    });
}



