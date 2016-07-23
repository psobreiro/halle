var app = angular.module('halleApp.homeController', []);

// Controler da pagina incial
app.controller('homeController', function($scope, $rootScope, $ionicPopup, $state, $stateParams, $cordovaContacts, $ionicPlatform, InvitePhoeNumberResource) {
  $scope.contacts = {};

  $scope.getAllContacts = function() {
      $cordovaContacts.find().then(function(allContacts) {
      $scope.contacts = allContacts;
      console.log(JSON.stringify(allContacts));
    });
  };

 // INIT POPUP INVITE CONTACTS
 // An elaborate, custom popup
 $scope.showInvite = function() {
   $scope.data = {};
   console.log('showInvite')
  var myPopup = $ionicPopup.show({
    template: '<ion-list>                                '+
              '  <ion-item ng-repeat="con in contacts">  '+
              '    {{con.displayName}}                   '+
              '  </ion-item>                             '+
              '</ion-list>                               ',
    title: $rootScope.message.inviteContacts,
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });
 };
 // FINISH POPUP INVITE CONTACTS

 // INIT POPUP INVITE PHONE
 // An elaborate, custom popup
 $scope.showInvitePhone = function() {
  $scope.data = {};
  $scope.error = false;
  $scope.msgError = "";

  var myPopup = $ionicPopup.show({
    templateUrl: '/components/invitePhone/invitePhone.html',
    title: $rootScope.message.inviteContacts,
    scope: $scope,
    buttons: [
      { text: $rootScope.message.cancel },
      {
        text: '<b>'+ $rootScope.message.inviteContactsSendInvite +'</b>',
        type: 'button-positive',
        onTap: function(e) {
           if ($scope.data.phone) {
             $scope.error = false;
             $scope.msgError = "";
             // chamar o serviço
             console.log('OK - ' +  $scope.data.phone);
             // Acessando o storage local
             var storage = new getLocalStorage();
             var token = storage.get();
             var phone = $scope.data.phone;
             console.log('OK PHONE- ' +  phone);

              // acessando o recurso de API
             InvitePhoeNumberResource.save({ token: token, phone: phone })
              .$promise
                .then(function(data) {
                  $scope.error = true;
                  console.log('OK - OK');

                }, function(error) {
                  $scope.error = true;
                  $scope.msgError = $rootScope.message.inviteContactsError;
                  e.preventDefault();
                  console.log('OK - NOK- ' + error.data);
                });

           } else {
             $scope.error = true;
             $scope.msgError = $rootScope.message.inviteContactsInvalid;
             e.preventDefault();
           }
         }
      }
    ]
  });
 };
 // FINISH POPUP INVITE PHONE

 // INIT EXIT - A confirm dialog
 $scope.showExit = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: '<b>' + $rootScope.message.title + '</b>',
     template: $rootScope.message.exitMessage,
     cancelText: $rootScope.message.cancel,
     okText: '<b>'+$rootScope.message.exit+'</b>'
   });

   confirmPopup.then(function(res) {
     if(res) {
       // Acessando o storage local
       var storage = new getLocalStorage();
       storage.remove();

       // redirecionando para o Login
       $state.go("login");
     }
   });
 };
 // END EXIT

});
