//projeto3/directives/pessoa.js
app.directive('pessoa', function() {
    return {
      templateUrl:'directives/pessoa.html',
      scope:{
        model:'=ngModel'
      }
    };
});
