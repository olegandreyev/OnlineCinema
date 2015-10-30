/**
 * Created by ой on 26.10.2015.
 */


module.exports = function (app) {

    app.controller('DirectorsCtl',['$scope','$window','movieService', function ($scope,$window, movieService) {
        $scope.director = {};
        var editDirector = - 1;

        $scope.createDirector = function (e) {
            e.preventDefault();
            movieService.createDirector($scope.director)
                .success(function (data) {
                    if(data.status === 'ok'){
                        $scope.director.id = data.id;
                        $scope.directorList.push($scope.director);
                        $scope.director ={}
                    }
                })
        };

        movieService.getDirectors().success(function (data) {
            $scope.directorList = data.map(function (director) {
                director.birthday = new Date(director.birthday);
                return director;
            });
        });

        $scope.isEdit = function (id) {
            return editDirector === id;
        };

        $scope.editDirector = function (id) {
            editDirector = id;
        };

        $scope.updateDirector = function ( director) {
            director = angular.copy(director);
            movieService.updateDirector(director)
                .success(function (data) {
                    if(data.status === 'ok'){
                        editDirector = - 1;
                    }
                });
        };

        $scope.removeDirector = function (id) {
            movieService.removeDirector(id)
                .success(function (data) {
                    if(data.status === 'ok'){
                        editDirector = - 1;
                        $scope.directorList = $scope.directorList.filter(function (director) {
                            return id !== director.id
                        })
                    }
                })
        }
    }])

   
};