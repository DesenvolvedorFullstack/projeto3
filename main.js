//projeto3/main.js
var app = angular.module('Projeto3',[]);
app.controller('MinhaController', function($scope, $http) {
    //Objeto pessoa
    $scope.pessoa = {
          nome:"Nataniel",
          idade:25,
          email:"nataniel.paiva@gmail.com"
    };
});
