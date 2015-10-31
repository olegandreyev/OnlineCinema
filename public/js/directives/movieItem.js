/**
 * Created by ой on 25.10.2015.
 */
module.exports = function (app) {
    app.directive('movieItem', function () {
        return {
            restrict:'E',
            templateUrl:'js/directives/movieItem.html',
            scope:{
                movie:'=',
                removeMovie:'&'
            }
        }
    })
};