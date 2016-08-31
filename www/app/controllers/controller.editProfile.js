angular.module('module.view.editProfile', [])
	.controller('editProfileCtrl', function($scope, $rootScope, $state,$ionicActionSheet,appService,$cordovaCamera,conversationService,$localStorage, $ionicHistory, $ionicPopup) {

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

			$scope.uploadUserPhoto = function () {
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
																		//alert(imageData);
																		$localStorage.account.userPhoto = "data:image/jpeg;base64," + imageData;
																		var ref = firebase.database().ref('accounts');
																		ref.orderByChild('userId').equalTo($localStorage.account.userId).on("child_added", function(snapshot) {
																			firebase.database().ref('/accounts/' + snapshot.key ).update({
																				photo: $localStorage.account.userPhoto
																			}).then( function() {
																				$localStorage.account.userPhoto = photo;
																				return;
																			});

																		});
																		$localStorage.account.userPhoto = "data:image/jpeg;base64," + imageData;
																}, function (err) {
																		appService.showAlert('Error', err, 'Close', 'button-assertive', null);
																});
														}, false);

														break;
												case 1: // Select From Gallery
														document.addEventListener("deviceready", function () {
																$cordovaCamera.getPicture(appService.getLibraryOptions()).then(function (imageData) {
																	$localStorage.account.userPhoto = "data:image/jpeg;base64," + imageData;
																	var ref = firebase.database().ref('accounts');
																	ref.orderByChild('userId').equalTo($localStorage.account.userId).on("child_added", function(snapshot) {
																		firebase.database().ref('/accounts/' + snapshot.key ).update({
																			photo: $localStorage.account.userPhoto
																		}).then( function() {
																			$localStorage.account.userPhoto = photo;
																			return;
																		});
																	});
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

				$scope.save = function () {
					var $inputs = $('.profile .profile__input input');
					var data = {};
					$inputs.map( function(elm) {
						data[$(this).attr('name')] = $(this).val();
					});
					
					// Password validation 
					if (data.oldPassword && data.newPassword) {
						if (!validatePassword(data)) { 
							$inputs.filter('[type="password"]').val('');
							return; 
						}
					}
					// Update Password
					var user = firebase.auth().currentUser,
							credential = firebase.auth.EmailAuthProvider.credential($localStorage.account.email, data.oldPassword);
					
					user.reauthenticate(credential).then(function() {
						user.updatePassword(data.newPassword).then(
	              function(){
										$localStorage.password = data.newPassword;
	              }, function(error){
									$ionicPopup.show({
										title: 'Error',
										subTitle: error.message,
										buttons: [
											{ text: 'OK' }
										]
									});
	                Codes.handleError(error)
	              }
	          );
					}, function(error) {
						$ionicPopup.show({
							title: 'Error',
							subTitle: error.message,
							buttons: [
								{ text: 'OK' }
							]
						});
					});

					// Update DB
					var ref = firebase.database().ref('accounts');
					ref.orderByChild('userId').equalTo($localStorage.account.userId).on("child_added", function(snapshot) {
						firebase.database().ref('/accounts/' + snapshot.key ).update({
							email: data.email,
							firstName: data.firstName,
							lastName: data.lastName,
							userName: data.userName,
							userDescription: data.userDescription
						}).then( function() {
							$localStorage.account.email = data.email;
							$localStorage.account.firstName = data.firstName;
							$localStorage.account.lastName = data.lastName;
							$localStorage.account.userName = data.userName;
							$localStorage.account.userDescription = data.userDescription;
							$state.go('tabs.account');
							return;
						});
					});
	      };

			// $localStorage.account.userDescription = "Jaylen's Description";
			// var ref = firebase.database().ref('accounts');
			// ref.orderByChild('userId').equalTo($localStorage.account.userId).on("child_added", function(snapshot) {
			// 	firebase.database().ref('/accounts/' + snapshot.key ).update({
			// 		userDescription: $localStorage.account.userDescription
			// 	}).then( function() {
			// 		$localStorage.account.userDescription = userDescription;
			// 		return;
			// 	});
			// });

        $scope.gotoFriend = function(){
        	$state.go('tabs.account');
        };
				
				function validatePassword(data) {
					if (data.oldPassword !== $localStorage.password) {
						$ionicPopup.show({
							title: 'Error',
							subTitle: 'Invalid Password',
							buttons: [
								{ text: 'OK' }
							]
						});
						return false;
					}
					if (data.newPassword !== data.confirmNewPassword) {
						$ionicPopup.show({
							title: 'Error',
							subTitle: 'Passwords do not match',
							buttons: [
								{ text: 'OK' }
							]
						});
						return false;
					}
					if (data.oldPassword === data.confirmNewPassword) {
						$ionicPopup.show({
							title: 'Error',
							subTitle: 'New password must be different from old password.',
							buttons: [
								{ text: 'OK' }
							]
						});
						return false;
					}
					if (data.newPassword.length < 6 || data.newPassword.length > 30) {
						$ionicPopup.show({
							title: 'Error',
							subTitle: 'New password must be between 5 and 30 characters.',
							buttons: [
								{ text: 'OK' }
							]
						});
						return false;
					}
					return true;
				}
				
});
