angular.module('module.view.login', [])
	.controller('loginCtrl', function($scope,$rootScope,$state,$ionicModal,postService,$ionicLoading,$timeout,$localStorage, Utils, $cordovaOauth, Popup,Social) {
          $scope.$on('$ionicView.enter', function() {
    //Clear the Login Form.
    $scope.user = {
      email: '',
      password: ''
    };

    //Check if the Social Login used already has an account on the Firebase Database. If not, the user is asked to complete a form.
    checkAndLoginAccount = function(response, provider, credential) {
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
        } else {
          //No account yet, proceed to completeAccount.
          Utils.hide();
          $localStorage.provider = provider;
          $state.go('tabs.signup');
        }
      });
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

   //Shows the error popup message when using the Login with Firebase.
  showFirebaseLoginError = function(errorCode) {
    switch (errorCode) {
      case 'auth/user-not-found':
        Utils.message(Popup.errorIcon, Popup.emailNotFound);
        break;
      case 'auth/wrong-password':
        Utils.message(Popup.errorIcon, Popup.wrongPassword);
        break;
      case 'auth/user-disabled':
        Utils.message(Popup.errorIcon, Popup.accountDisabled);
        break;
      case 'auth/too-many-requests':
        Utils.message(Popup.errorIcon, Popup.manyRequests);
        break;
      default:
        Utils.message(Popup.errorIcon, Popup.errorLogin);
        break;
    }
  };

  $scope.loginWithGoogle = function() {
    Utils.show();
    //Login with Google token using the googleWebClientId from app.js
    $cordovaOauth.google(Social.googleWebClientId, ["https://www.googleapis.com/auth/userinfo.email"]).then(function(response) {
      var credential = firebase.auth.GoogleAuthProvider.credential(response.id_token,
        response.access_token);
      $localStorage.id_token = response.id_token;
      $localStorage.access_token = response.access_token;
      loginWithCredential(credential, 'Google');
    }, function(error) {
      //User cancelled login. Hide the loading modal.
      Utils.hide();
    });
  };

  //Shows the error popup message when using the Social Login with Firebase.
  showSocialLoginError = function(errorCode) {
    switch (errorCode) {
      case 'auth/account-exists-with-different-credential':
        Utils.message(Popup.errorIcon, Popup.accountAlreadyExists);
        break;
      case 'auth/invalid-credential':
        Utils.message(Popup.errorIcon, Popup.sessionExpired);
        break;
      case 'auth/operation-not-allowed':
        Utils.message(Popup.errorIcon, Popup.serviceDisabled);
        break;
      case 'auth/user-disabled':
        Utils.message(Popup.errorIcon, Popup.accountDisabled);
        break;
      case 'auth/user-not-found':
        Utils.message(Popup.errorIcon, Popup.userNotFound);
        break;
      case 'auth/wrong-password':
        Utils.message(Popup.errorIcon, Popup.wrongPassword);
        break;
      default:
        Utils.message(Popup.errorIcon, Popup.errorLogin);
        break;
    }
  };

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
