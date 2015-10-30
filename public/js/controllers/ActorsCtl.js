/**
 * Created by ой on 31.10.2015.
 */

module.exports = function (app) {
    app.controller('ActorsCtl',['$scope','$window','movieService', function ($scope,$window,movieService) {
        $scope.actor = {};
        var editActor = - 1;

        $scope.createActor = function (e) {
            e.preventDefault();
            movieService.createActor($scope.actor)
                .success(function (data) {
                    if(data.status === 'ok'){
                        $scope.actor.id = data.id;
                        $scope.actorList.push($scope.actor);
                        $scope.actor ={}
                    }
                })
        };

        movieService.getAllActors().success(function (data) {
            $scope.actorList = data;
        });

        $scope.isEdit = function (id) {
            return editActor === id;
        };

        $scope.editActor = function (id) {
            editActor = id;
        };

        $scope.updateActor = function ( actor) {
            actor = angular.copy(actor);
            movieService.updateActor(actor)
                .success(function (data) {
                    if(data.status === 'ok'){
                        editActor = - 1;
                    }
                });
        };

        $scope.removeActor = function (id) {
            movieService.removeActor(id)
                .success(function (data) {
                    if(data.status === 'ok'){
                        editActor = - 1;
                        $scope.actorList = $scope.actorList.filter(function (actor) {
                            return id !== actor.id
                        })
                    }
                })
        }
    }])
};