angular.module('module.view.editProfile', [])
	.controller('editProfileCtrl', function($scope,$rootScope,$state) {
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
                
		$scope.sendPhoto = function () {
                    var message = {
                        sentAt: new Date(),
                        name: $rootScope.user.name,
                        photo: $rootScope.user.photo,
                        senderid: $rootScope.user.id
                    };
                    $ionicActionSheet.show({
                        buttons: [{
                            text: 'Take Picture'
                        }, {
                                text: 'Select From Gallery'
                            }],
                        buttonClicked: function (index) {
                            switch (index) {
                                case 0: // Take Picture
                                    document.addEventListener("deviceready", function () {
                                        $cordovaCamera.getPicture(appService.getCameraOptions()).then(function (imageData) {
                                            message.text = '<img src="' + "data:image/jpeg;base64," + imageData + '" style="max-width: 300px">';
                                            $timeout(function () {
                                                $scope.chat.messages.push(message);
                                                viewScroll.scrollBottom(true);
                                            }, 0);
                                        }, function (err) {
                                            appService.showAlert('Error', err, 'Close', 'button-assertive', null);
                                        });
                                    }, false);
                                    break;
                                case 1: // Select From Gallery
                                    document.addEventListener("deviceready", function () {
                                        $cordovaCamera.getPicture(appService.getLibraryOptions()).then(function (imageData) {
                                            message.text = '<img src="' + "data:image/jpeg;base64," + imageData + '" style="width: 500px;height:500px">';
                                            $timeout(function () {
                                                $scope.chat.messages.push(message);
                                                viewScroll.scrollBottom(true);
                                            }, 0);
                                        }, function (err) {
                                            appService.showAlert('Error', err, 'Close', 'button-assertive', null);
                                        });
                                    }, false);
                                    break;
                            }
                            return true;
                        }
                    });
                };

        $scope.gotoFriend = function(){
        	$state.go('tabs.account');
        }
});
