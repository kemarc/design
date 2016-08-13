angular.module('module.view.login', [])
	.controller('loginCtrl', function($scope,$rootScope,$state,$ionicModal,postService,$ionicLoading,$timeout,$localStorage, Utils, $cordovaOauth, Popup) {
          $scope.$on('$ionicView.enter', function() {
    //Clear the Login Form.
    $scope.user = {
      email: '',
      password: ''
    };

    //Check if user is already authenticated on Firebase and authenticate using the saved credentials.
    if ($localStorage) {
      if ($localStorage.loginProvider) {
        Utils.message(Popup.successIcon, Popup.welcomeBack);
        //The user is previously logged in, and there is a saved login credential.
        if ($localStorage.loginProvider == "Firebase") {
          //Log the user in using Firebase.
          loginWithFirebase($localStorage.email, $localStorage.password);
        } else {
          //Log the user in using Social Login.
          var provider = $localStorage.loginProvider;
          var credential;
          switch (provider) {
            case 'Facebook':
              credential = firebase.auth.FacebookAuthProvider.credential($localStorage.access_token);
              break;
            case 'Google':
              credential = firebase.auth.GoogleAuthProvider.credential($localStorage.id_token, $localStorage.access_token);
              break;
            case 'Twitter':
              credential = firebase.auth.TwitterAuthProvider.credential($localStorage.oauth_token, $localStorage.oauth_token_secret);
              break;
          }
          loginWithCredential(credential, $localStorage.loginProvider);
        }
      } else if ($localStorage.isGuest) {
        //The user previously logged in as guest, entering as a new guest again.
        Utils.message(Popup.successIcon, Popup.welcomeBack);
        loginFirebaseGuest();
      }
    }
  })

  $scope.login = function(user) {
    if (angular.isDefined(user)) {
      Utils.show();
      loginWithFirebase(user.email, user.password);
    }
  };

  //Function to login to Firebase using email and password.
  loginWithFirebase = function(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(response) {
        //Retrieve the account from the Firebase Database
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('accounts').orderByChild('userId').equalTo(userId).once('value').then(function(accounts) {
          if (accounts.exists()) {
            accounts.forEach(function(account) {
              //Account already exists, proceed to home.
              Utils.hide();
              firebase.database().ref('accounts/' + account.key).on('value', function(response) {
                var account = response.val();
                $localStorage.account = account;
              });
              $state.go('tabs.news');
            });
          }
        });
        $localStorage.loginProvider = "Firebase";
        $localStorage.email = email;
        $localStorage.password = password;
      })
      .catch(function(error) {
        var errorCode = error.code;
        showFirebaseLoginError(errorCode);
      });
  }


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

          $scope.gotoHome = function () {
                  $scope.closeAll();
                  $ionicLoading.show({
                      template: '<ion-spinner></ion-spinner>'
                  });

                  $timeout(function () {
                      $ionicLoading.hide();
                      $state.go('tabs.news');
                  }, 2000);

              };

              // Login modal
              $ionicModal.fromTemplateUrl('app/intro/login.html', {
                      scope: $scope,
                      animation: 'fade-in-scale',
                      backdropClickToClose: false
                  }).then(function (modal) {
                      $scope.modalLogin = modal;
                  });
              $scope.openLogin = function () {
                      $scope.modalLogin.show();
                  };
              $scope.closeLogin = function () {
                      $scope.modalLogin.hide();
                  };

              $scope.googleSignIn = function(){
                      
                      authService.googleSignIn();
                  };

              $scope.googleSignOut = function(){
                      authService.googleSignOut;
                  };

                   // Forgot Password modal
              $ionicModal.fromTemplateUrl('app/intro/forgot.html', {
                      scope: $scope,
                      animation: 'fade-in-scale',
                      backdropClickToClose: false
                  }).then(function (modal) {
                      $scope.modalForgot = modal;
                  });
              $scope.openForgot = function () {
                      $scope.modalForgot.show();
                  };
              $scope.closeForgot = function () {
                      $scope.modalForgot.hide();
                  };

              $scope.closeAll = function () {
                    $scope.closeForgot();
                    $scope.closeLogin();
                }

             $scope.starterScreen = function() {
                $rootScope.user = {
                    id: 1,
                    name: 'Adam Ionic',
                    email: 'adamionic@email.com',
                    photo: 'img/users/1.jpg',
                    city: 'Cambridge, United Kingdom'
                }
                $scope.contacts = engagementsService.getContacts();
                $scope.searchPopover = $ionicPopover.fromTemplate(searchTemplate, {
                    scope: $scope
                });
                $scope.getSearch = function (search) {
                    $scope.searchFilter = search;
                }

                $cordovaGeolocation.getCurrentPosition({ timeout: 10000, enableHighAccuracy: true }).then(
                    function (position) {
                        $rootScope.currentLocation = [position.coords.latitude, position.coords.longitude];
                    });

                $scope.goTo = function (page) {
                    $scope.closeAll();//Close all Modals
                    $state.go(page);
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
                }

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

                $scope.signOut = function () {
                    $ionicLoading.show({
                        template: 'Signing out...'
                    });
                    $timeout(function () {
                        $ionicLoading.hide();
                        $scope.goTo('authentication');
                    }, 2000);

                }
            }
});