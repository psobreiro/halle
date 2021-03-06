var app = angular.module('halleApp.resources', ['ngResource']);

/****************Constantes ***********************/
app.constant('ApiEndpoint', {
  url: 'http://192.241.158.95/HalleWEB/service'
  //url: 'http://localhost:8080/HalleWEB/service'
});

/***************** Contacts ****************************/
app.factory("ContactManagerResource", function($cordovaContacts) {
    var contacts; //variable that holds contacts, returned from getContacts

     return {
       getContacts: function() {
         var options = {};
          options.filter = "";
          options.multiple = true;

          //get the phone contacts
          return $cordovaContacts.find(options);
        }
     }
  });

/*****************Recursos*****************************/
app.factory('AuthResource', function ($resource, ApiEndpoint) {
    var data =  $resource(ApiEndpoint.url +'/user/auth/:login/:password',
                                      {login: '@login', password: '@password' },
                                      {save:   {method:'POST'}}
                         );
    return data;
});

app.factory('CreateUserResource', function ($resource, ApiEndpoint) {
    var data =  $resource(ApiEndpoint.url +'/user/:login/:phone/:password',
                                      {login: '@login', phone: '@phone', password: '@password' },
                                      {save:   {method:'POST'}}
                         );
    return data;
});

app.factory('ForgotResource', function ($resource, ApiEndpoint) {
    var data =  $resource(ApiEndpoint.url +'/user/forgot/:login/:phone',
                                      {login: '@login', phone: '@phone' },
                                      {save:   {method:'POST'}}
                         );
    return data;
});


app.factory('FriendsListResource', function ($resource, ApiEndpoint) {
    var data =  $resource(ApiEndpoint.url +'/friend/:token',
                                      {token: '@token' },
                                      {get:   {method:'GET', isArray: true}}
                         );
    return data;
});

app.factory('InvitePhoneNumberResource', function ($resource, ApiEndpoint) {
    var data =  $resource(ApiEndpoint.url +'/invite/phone/:token/:name/:phone',
                                      {token: '@token', name : '@name', phone : '@phone' },
                                      {save:   {method:'POST'}}
                         );
    return data;
});

app.factory('FindUserResource', function ($resource, ApiEndpoint) {
    var data =  $resource(ApiEndpoint.url +'/user/:token',
                                      {token: '@token' },
                                      {get:   {method:'GET'}}
                         );
    return data;
});

app.factory('EditUserResource', function ($resource, ApiEndpoint) {
    var data =  $resource(ApiEndpoint.url +'/user/',
                                      {save:   {method:'POST',
                                                headers: [{'Content-Type': 'application/json'}]
                                      }}
                         );
    return data;
});


app.factory('ValidTokenResource', function ($resource, ApiEndpoint) {
    var data =  $resource(ApiEndpoint.url +'/user/valid/:token',
                                      {token: '@token' },
                                      {get:   {method:'GET'}}
                         );
    return data;
});

app.factory('ChangePasswordResource', function ($resource, ApiEndpoint) {
    var data =  $resource(ApiEndpoint.url +'/user/changepassword/:token/:password',
                                      {token: '@token', password: '@password' },
                                      {update:   {method:'PUT'}}
                         );
    return data;
});

app.factory('DeletePhoneResource', function ($resource, ApiEndpoint) {
    var data =  $resource(ApiEndpoint.url +'/user/:token',
                                      {token: '@token' },
                                      {delete:   {method:'DELETE'}}
                         );
    return data;
});

app.factory('FeedbackResource', function ($resource, ApiEndpoint) {
    var data =  $resource(ApiEndpoint.url +'/feedback/',
                                      {save:   {method:'POST',
                                                headers: [{'Content-Type': 'application/json'}]
                                      }}
                         );
    return data;
});

app.factory('MessageReceiveResource', function ($resource, ApiEndpoint) {
    var data =  $resource(ApiEndpoint.url +'/message/:token',
                                      {token: '@token' },
                                      {get:   {method:'GET', isArray: true}}
                         );
    return data;
});
