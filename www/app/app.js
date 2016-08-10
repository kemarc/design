
angular.module('full_starter', ['ionic', 'full_starter.controllers', 'full_starter.routes', 'full_starter.services', 'full_starter.directives'])

  .run(function ($ionicPlatform, appService) {

    // $rootScope.$on('$stateChangeStart', function(event, toState, toParams){
    //   event.preventDefault();
    //   if(authService){
    //     console.log(typeof(onAuthStateChanged));
    //    authService.googleAuth().onAuthStateChanged(function(user){
    //       if(user){
    //           console.log('logged in');
    //           console.log(user);
    //           $state.go(toState.name, toParams);
    //           return;
    //       }
    //       $state.go('authentication');
    //     });
    //   }
    // });

    $ionicPlatform.ready(function () {
      
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        // $cordovaKeyboard.hideAccessoryBar(true);
        // cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })