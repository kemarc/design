angular.module('module.view.rather', [])
	.controller('ratherCtrl', function($scope,$rootScope,$state,interestService,userInterestService) {
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

          $scope.getInterest = function(id){
            return interestService.getInterest(id);
        };

          $scope.createUserInterest = function(interestId,userId){
            return userInterestService.createUserInterest(interestId,userId);
        };

        $scope.isChecked = function(interestId, userId){
            console.log({interestId: interestId, userId: userId});
            return userInterestService.checkUserInterestExists(interestId,userId);
          };

          $scope.manageUserInterest = function(evt, interestId, userId){
            console.log(evt);
            var element = evt.target || evt.srcElement;
            var checked = element.checked;
            return userInterestService.manageUserInterest(interestId,userId,checked);
          };

         $scope.comm = {
          items: $scope.getInterest(),
          manage: $scope.manageUserInterest,
          isChecked: $scope.isChecked
         };

});