/**
 * Created by ПК on 31.10.2015.
 */

module.exports = function (app) {
  app.controller('AddMovieCtl',['$scope','$window','movieService', function ($scope,$window,movieService) {
        $scope.movie = {
        };
      $scope.movieActors = [];

      var rangeYear = [];
      var rating = [1,2,3,4,5,6,7,8,9,10];
      movieService.getGenres().success(function (data) {
          $scope.genres = data;
      });
      movieService.getAllActors().success(function (data) {
          $scope.actors = data;
      });
      movieService.getDirectors().success(function (data) {
          $scope.directors = data;
      });
      movieService.getCountries().success(function (data) {
          $scope.countries = data;
      });
      $scope.addMovie = function () {
          var keys = Object.keys($scope.movie);
          if(keys.length < 10){
              alert('Заполните все поля прежде чем добавлять фильм');
              return;
          }

         movieService.addMovie($scope.movie, $scope.movieActors).success(function (data) {
             alert('Фильм успешно добавлен!');
            $window.history.back();
         })
      };


      for(var i = 1945 ; i<=2015; i++){
          rangeYear.push(i);
      }
      $scope.getYears = function () {
          return rangeYear;
      }
      $scope.getRaitings = function () {
          return rating
      }


  }])
};