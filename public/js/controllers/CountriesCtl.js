/**
 * Created by ПК on 30.10.2015.
 */

module.exports = function (app) {
    app.controller('CountriesCtl',['$scope','$window','movieService', function ($scope,$window,movieService) {
        $scope.country = {};
        $scope.busyCountries = [];
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
        movieService.getMovieData('country').success(function (data) {
            console.log(data);
            $scope.busyCountries = data;
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

        $scope.isBusyCountry = function (id) {
            return $scope.busyCountries.some(function (data) {
                return data.country === id;
            }) ? 'list-group-item busy':'list-group-item no-busy'
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