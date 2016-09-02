angular.module('module.view.news', [])
    .controller('newsCtrl', function ($scope, $rootScope, $state, postService, appService, $cordovaCamera, $localStorage, $ionicActionSheet, conversationService, $ionicSideMenuDelegate, $ionicPopover, engagementService) {
        $scope.engagementService = engagementService;
        window.engagementService = $scope.engagementService;
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
                name: $localStorage.userName,
                photo: $localStorage.userPhoto,
                senderid: $localStorage.account.userId
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
        
        $scope.createPost = function() {
          $state.go('tabs.event');
        };

        $scope.gotoExplore = function () {
            $state.go('tabs.explore');

        };

        $scope.gotoMatch = function () {
            $state.go('tabs.match');

        };

        $scope.gotoAccount = function () {
            $state.go('tabs.account');

        };

        $scope.gotoCoaches = function () {
            $state.go('tabs.coach');

        };

        $scope.newsPopover = $ionicPopover.fromTemplate(newsTemplate, {
            scope: $scope
        });

        $ionicSideMenuDelegate.canDragContent(false);
        
        postService.getNews().then(function(results) {
          $scope.news = {
              type: 'image',
              items: results
          };
        });
      
    });

var newsTemplate =
    '<ion-popover-view class="medium right">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-icon-left item-text-wrap" ng-click="createPost()">' +
    '<i class="icon ion-ios-bell-outline"></i>Create Event' +
    '</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';

var searchTemplate =
    '<ion-popover-view class="search">' +
    '<ion-content scroll="false">' +
    '<div class="list item-input-inset">' +
    '<label class="item-input-wrapper">' +
    '<i class="icon ion-ios-search placeholder-icon"></i>' +
    '<input type="search" placeholder="Search" ng-model="schoolSearch" ng-model-options="{ debounce: 550 }" ng-change="getSearch(schoolSearch)"></label>' +
    ' <i class="icon ion-close" ng-show="schoolSearch" ng-click="getSearch(\'\');popover.hide($event);schoolSearch=\'\'"></i>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';
