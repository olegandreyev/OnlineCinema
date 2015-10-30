/**
 * Created by ой on 25.10.2015.
 */

module.exports = function (app) {

    app.directive('goBack',['$window',function ($window) {
        return {
            restrict:'A',
            link: function (scope, elem, attrs) {
                elem.on('click', function () {
                    $window.history.back();
                })
            }
        }
    }])
};