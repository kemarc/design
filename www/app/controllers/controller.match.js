angular.module('module.view.match', [])
	.controller('matchCtrl', function($scope,$rootScope,$state) {
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
          }

		 $scope.gotoBrowse = function () {
                    $state.go('tabs.browse');
                   
        };

       $scope.gotoAccount = function () {
                    $state.go('tabs.account');
                   
        };

        $scope.gotoCoaches = function () {
                    $state.go('tabs.coach');
           
        };

        $scope.gotoContacts = function () {
                    $state.go('tabs.contacts');
           
        };


});