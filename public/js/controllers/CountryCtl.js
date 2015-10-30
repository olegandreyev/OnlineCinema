/**
 * Created by ой on 30.10.2015.
 */

module.exports = function (app) {
    app.controller('AddCountryCtl',['$scope','$window','movieService', function ($scope,$window,movieService) {
        $scope.country = {};
       var editCountry = - 1;

        $scope.createCountry = function (e) {
            e.preventDefault();
            movieService.createCountry($scope.country)
                .success(function (data) {
                    if(data.status === 'ok'){
                        $scope.country.id = data.id;
                        $scope.countryList.push($scope.country);
                        $scope.country ={}
                    }
                })
        };

        movieService.getCountries().success(function (data) {
            $scope.countryList = data;
        });

        $scope.isEdit = function (id) {
            return editCountry === id;
        };

        $scope.editCountry = function (id) {
            editCountry = id;
        };

        $scope.updateCountry = function ( country) {
            country = angular.copy(country);
            movieService.updateCountry(country)
                .success(function (data) {
                    if(data.status === 'ok'){
                        editCountry = - 1;
                    }
                });
        };

        $scope.removeCountry = function (id) {
            movieService.removeCountry(id)
                .success(function (data) {
                    if(data.status === 'ok'){
                        editCountry = - 1;
                        $scope.countryList = $scope.countryList.filter(function (country) {
                            return id !== country.id
                        })
                    }
                })
        }
    }])
};