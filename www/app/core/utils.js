(function () {

    'use strict'

angular.module('full_starter.factory',[])
.factory('Utils', function($ionicLoading, $timeout, Popup) {
  var promise;
  var Utils = {
    show: function() {
      $ionicLoading.show({
        template: '<ion-spinner icon="ripple"></ion-spinner>'
      });
    },
    hide: function() {
      $ionicLoading.hide();
    },
    message: function(icon, message) {
      $ionicLoading.show({
        template: '<div class="message-popup" onclick="hideMessage()"><h1><i class="icon ' + icon + '"></i></h1><p>' + message + '</p></div>',
        scope: this
      });
      promise = $timeout(function() {
        $ionicLoading.hide();
      });
      return promise;
    }
  };

  var hideMessage = function() {
    $timeout.cancel(promise);
    $ionicLoading.hide();
  };

  return Utils;
});

})();

