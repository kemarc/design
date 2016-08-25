angular.module('module.view.editProfile', [])
	.controller('editProfileCtrl', function($scope,$rootScope,$state,engagementsService, $localStorage) {
		
		$scope.profile = $localStorage.account;
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

        // fn change username
          $scope.changeUsername = function() {
            showPopup('Change username', preparePopupData('meta', 'username'));
            myPopup.then(function(newUsername) {
              if(newUsername != undefined && newUsername != null) {
                Profile.changeUserName($scope.AuthData.uid, newUsername).then(
                  function(returnObj){
                    if(returnObj != "USERNAME_TAKEN") {
                      loadProfileData();
                    } else {
                      $timeout(function(){
                        $scope.changeUsername();  //reopen
                      }, 1500)
                    }
                  }
                )
              }
            });
          };


        $scope.doChangePassword = function() {
        if($scope.changePasswordData.userEmail && $scope.changePasswordData.oldPassword && $scope.changePasswordData.newPassword) {
            Utils.showMessage("Changing password... ");
            Auth.changePassword(
                $scope.changePasswordData.userEmail,
                $scope.changePasswordData.oldPassword,
                $scope.changePasswordData.newPassword).then(
                function(AuthData){

                    //
                    Utils.showMessage("Password Changed!");
                    //
                    $scope.loginData = {
                        userEmail:      $scope.changePasswordData.userEmail,
                        userPassword:   $scope.changePasswordData.newPassword,
                    }
                    $scope.doLogin();

                }, function(error){
                    Codes.handleError(error)
                }
            )
        } else {
            Codes.handleError({code: "INVALID_INPUT"})
        }
      };

        $scope.saveReminder = function () {
                    if ($scope.reminderForm.$valid) {
                        if ($stateParams.reminder === null) {
                            $rootScope.notifications.push($scope.reminder);
                        } else {
                            $rootScope.notifications.splice($rootScope.notifications.indexOf(_.find($rootScope.notifications, function (obj) { return obj == $stateParams.reminder })), 1, $scope.reminder);
                        }
                    } else {
                        appService.showAlert('Form Invalid', '<p class="text-center">A title and start date is required</p>', 'Ok', 'button-assertive', null);
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
                                        $cordovaCamera.getPicture(conversationService.getCameraOptions()).then(function (imageData) {
                                            message.text = '<img src="' + "data:image/jpeg;base64," + imageData + '" style="max-width: 300px">';
                                            $timeout(function () {
                                                $scope.chat.messages.push(message);
                                                viewScroll.scrollBottom(true);
                                            }, 0);
                                        }, function (err) {
                                            engagementsService.showAlert('Error', err, 'Close', 'button-assertive', null);
                                        });
                                    }, false);
                                    break;
                                case 1: // Select From Gallery
                                    document.addEventListener("deviceready", function () {
                                        $cordovaCamera.getPicture(conversationService.getLibraryOptions()).then(function (imageData) {
                                            message.text = '<img src="' + "data:image/jpeg;base64," + imageData + '" style="width: 500px;height:500px">';
                                            $timeout(function () {
                                                $scope.chat.messages.push(message);
                                                viewScroll.scrollBottom(true);
                                            }, 0);
                                        }, function (err) {
                                            engagementsService.showAlert('Error', err, 'Close', 'button-assertive', null);
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
