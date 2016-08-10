angular.module('module.view.login', [])
	.controller('loginCtrl', function($scope,$rootScope,$state,authService,$ionicModal,appService,$ionicLoading,$timeout) {
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

              //Function to login to Firebase using email and password.
            var loginWithFirebase = function(email, password) {
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
                            $state.go('home');
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
                $scope.contacts = appService.getContacts();
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