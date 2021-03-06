var app = angular.module('halleApp.invitePhoneController', []);

// Controller da pagina de criar usuario
app.controller('invitePhoneController', function($scope, $rootScope, $state, $http, InvitePhoneNumberResource) {

  // Form data
  $scope.data = {};

  // Perform the submit
  $scope.onSubmit = function() {
    // mensagem de erro
    $scope.error = false;
    $scope.msgError = "";
    // mensagem de sucesso
    $scope.sucess = false;
    $scope.msgSucess = "";

    // atributos
    var name = $scope.data.name;
    var phone = $scope.data.phone;

    // Validação
    if ($scope.data.$valid) {
      $scope.msgError = $rootScope.message.inviteContactsInvalid;
    }

    // telefone
    if (phone == null) {
      $scope.msgError = $rootScope.message.inviteContactsInvalid;
    }

    if (name == null) {
      $scope.msgError = $rootScope.message.inviteContactsName;
    }

    if ($scope.msgError != "") {
      $scope.error = true;
    }
    else {
      // Acessando o storage local
      var storage = new getLocalStorage();
      var token = storage.get();

      // acessando o recurso de API
     InvitePhoneNumberResource.save({ token: token, name: name, phone: phone })
      .$promise
        .then(function(data) {
          $scope.sucess = true;
          $scope.msgSucess =  data.message;
        },
        function(error) {
          $scope.error = true;
          $scope.msgError =  error.data.message;
        });
    }
  }
});
