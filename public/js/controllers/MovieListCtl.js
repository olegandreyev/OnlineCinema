
module.exports = function (app) {
    app.controller('MovieListCtl',['$scope','$timeout','movieService', function ($scope,$timeout ,movieService) {
        $scope.search = '';
        $scope.searchType = 'm.title';
        $scope.activeGenre = -1;

        movieService.getGenres().success(function (data) {
            $scope.genreList = data;
        });

        movieService.getAllMovies().success(function (data) {
            $scope.movies = data;
        });

        $scope.selectGenre = function (id, index) {
            $scope.activeGenre = index;
            if(index != -1) {
                movieService.getMoviesByGenre(id).success(function (data) {
                    $scope.movies = data;
                });
            }else{
                movieService.getAllMovies().success(function (data) {
                    $scope.movies = data;
                });
            }

        };
        $scope.isActiveGenre = function (index) {
            return index == $scope.activeGenre ? 'list-group-item active':'list-group-item'
        };

        $scope.searchMovies = function (e) {
            e.preventDefault();
            movieService.getMovieBySearch($scope.searchType, $scope.search)
                .success(function (data) {
                    $scope.movies = data;
                })
        };
        $scope.removeMovie = function (id) {
            movieService.removeMovie(id).success(function (data) {
                if(data.status == 'ok'){
                    $scope.movies = $scope.movies.filter(function (movie) {
                        return id !== movie.id
                    })
                }
            })
        };
        $scope.$watch('movies', function () {
            $timeout(function () {
                $(".movie-descr").dotdotdot({
                    //	configuration goes here
                });
            });
        })


    }]);
};

