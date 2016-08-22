angular.module('module.view.signup', ['full_starter.factory'])
	.controller('signupCtrl', function($scope,$rootScope,$state,conversationService,Utils,Popup,$localStorage,interestService,userInterestService) {
   $scope.$on('$ionicView.enter', function() {
    //Clear the Registration Form.
    $scope.user = {
      email: '',
      password: ''
    };
  })

  $scope.register = function(user) {
    //Check if form is filled up.
    if (angular.isDefined(user)) {
      Utils.show();
      firebase.database().ref('accounts').orderByChild('email').equalTo(user.email).once('value').then(function(accounts) {
        if (accounts.exists()) {
          Utils.message(Popup.errorIcon, Popup.emailAlreadyExists);
        } else {
          //Create Firebase account.
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(function() {
              //Add Firebase account reference to Database. Firebase v3 Implementation.
              firebase.database().ref().child('accounts').push({
                email: user.email,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                userId: firebase.auth().currentUser.uid,
                dateCreated: Date(),
                provider: 'Firebase'
              }).then(function(response) {
                //Account created successfully, logging user in automatically after a short delay.
                Utils.message(Popup.successIcon, Popup.accountCreateSuccess)
                  .then(function() {
                    getAccountAndLogin(response.key);
                  })
                  .catch(function() {
                    //User closed the prompt, proceed immediately to login.
                    getAccountAndLogin(response.key);
                  });
                $localStorage.loginProvider = "Firebase";
                $localStorage.email = user.email;
                $localStorage.password = user.password;
                $localStorage.userName = user.userName;
                $localStorage.firstName = user.firstName;
                $localStorage.lastName = user.lastName;

              });
            })
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              //Show error message.
              console.log(errorCode);
              switch (errorCode) {
                case 'auth/email-already-in-use':
                  Utils.message(Popup.errorIcon, Popup.emailAlreadyExists);
                  break;
                case 'auth/invalid-email':
                  Utils.message(Popup.errorIcon, Popup.invalidEmail);
                  break;
                case 'auth/operation-not-allowed':
                  Utils.message(Popup.errorIcon, Popup.notAllowed);
                  break;
                case 'auth/weak-password':
                  Utils.message(Popup.errorIcon, Popup.weakPassword);
                  break;
                default:
                  Utils.message(Popup.errorIcon, Popup.errorRegister);
                  break;
              }
            });
        }
      });
    }
  };

  //Function to retrieve the account object from the Firebase database and store it on $localStorage.account.
  getAccountAndLogin = function(key) {
    firebase.database().ref('accounts/' + key).on('value', function(response) {
      var account = response.val();
      $localStorage.account = account;
    });
    $state.go('tabs.rather');
  };
  
$scope.clientSideList = [
    { text: "Yes", value: "trainer" },
    { text: "No", value: "regular" }
  ];

  $scope.serverSideList = [
    { text: "Celebrity Trainer", value: "celebrity" },
    { text: "Freelance Trainer", value: "freelance" },
    { text: "Professional", value: "professional" }
  ];
  
  $scope.data = {
    clientSide: 'ng'
  };
  
  $scope.serverSideChange = function(item) {
    console.log("Selected Serverside, text:", item.text, "value:", item.value);
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
  };

  $scope.createInterestList = function(){
    return interestService.createInterestList();
  };

 

    $scope.starterScreen = function() {
                $rootScope.user = {
                    id: 1,
                    name: 'Adam Ionic',
                    email: 'adamionic@email.com',
                    photo: 'img/users/1.jpg',
                    city: 'Cambridge, United Kingdom'
                }
                $scope.contacts = conversationsService.getContacts();
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
