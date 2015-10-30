/**
 * Created by ой on 25.10.2015.
 */

module.exports = function (app) {
    app.controller('WatchCtl',['$scope','movieService','$routeParams','$sce',
        function ($scope, movieService, $routeParams, $sce) {
            var movieId = $routeParams.id;
            movieService.getMovieById(movieId)
                .success(function (data) {
                    $scope.movie = data;
                    $scope.movie.vkSrc = $sce.trustAsResourceUrl($scope.movie.vkSrc)
                    movieService.getActorsFromMovie(movieId)
                        .success(function (data) {
                            $scope.mainActors = data;
                        })
            });
    }])
};