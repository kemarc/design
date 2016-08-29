angular.module('module.view.settings', [])
	.controller('settingsCtrl', function($scope,$rootScope,$state,$ionicLoading,$timeout,Popup,$localStorage) {
        $scope.goBack = function (ui_sref) {
                    var currentView = $ionicHistory.currentView();
                    var backView = $ionicHistory.backView();

                    if (backView) {
                        //there is a back view, go to it
                        if (currentView.stateName == backView.stateName) {
                            //if not works try to go doubleBack
                            var doubleBackView = $ionicHistory.getViewById(backView.backViewId);
                            $state.go(doubleBackView.stateName, doubleBackView.stateParams);
                        } else {
                            backView.go();
                        }
                    } else {
                        $state.go(ui_sref);
                    }
                };
				$scope.profile = $localStorage.account;
                
        $scope.logout = function() {
        if (firebase.auth()) {
          firebase.auth().signOut().then(function() {
            //Clear the saved credentials.
            $localStorage.$reset();
            //Proceed to login screen.
            $state.go('authentication');
          }, function(error) {
            //Show error message.
            Utils.message(Popup.errorIcon, Popup.errorLogout);
          });
        }
      };
});
