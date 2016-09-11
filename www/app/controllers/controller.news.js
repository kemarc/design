angular.module('module.view.news', [])
    .controller('newsCtrl', function ($scope, $rootScope, $state, $cordovaCamera, $localStorage, $ionicActionSheet, $ionicSideMenuDelegate, $ionicPopover, engagementsService, postService, appService, conversationService, appointmentsService) {

        var publicServices = {
            'post': true,
            'engagements': true,
            'appointments': true
        }

        //for dev purposes only. remove when done
        for (var key in publicServices) {
            if (publicServices[key]) {
                $scope[key + 'Service'] = eval(key + 'Service');
                window[key + 'Service'] = $scope[key + 'Service'];
            }
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

        $scope.createPost = function () {
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

        $scope.toggleLike = function(postId, userId){
          var posts = $scope.news.items;
          if(postId in posts){
            var post = $scope.news.items[postId];
            var actionable = post.state.actionable;
            if(actionable){
              post.liked = !post.liked;
              var state = (post.liked)?'like':'unlike';
              return engagementsService[state]('post', postId, $localStorage.account.userId);
            }
          }
            return false;
        };

        $scope.toggleCommit = function(postId, userId){
          var posts = $scope.news.items;
          if(postId in posts){
            var post = $scope.news.items[postId];
            var actionable = post.state.actionable;
            if(actionable){
              post.committed = !post.committed;
              var state = (post.committed)?'commit':'decommit';
              return engagementsService[state]('post', postId, $localStorage.account.userId);
            }
          }
            return false;
        };

        $scope.newsPopover = $ionicPopover.fromTemplate(newsTemplate, {
            scope: $scope
        });

        $ionicSideMenuDelegate.canDragContent(false);

        $scope.delete = function (id) {
            return postService.delete(id);
        };

        $scope.update = function (data) {
            return postService.update(data);
        };

        $scope.event = function () {

            $state.go('tabs.event');
        };

        postService.getNews().then(function(results) {
          //create a local object so we can create the datastructure we want
          //so we can use it to show/hide, toggle ui items
          var news = {
              type: 'image',
              items: results
          };
          for(var id in news.items){
            //check to see if there is a like on this post
            console.log({postId: engagementsService.liked('post', id, $localStorage.account.userId)});
            engagementsService.liked('post', id, $localStorage.account.userId).then(function(liked){
              news.items[id].liked = liked;
            });
            engagementsService.committed('post', id, $localStorage.account.userId).then(function(committed){
              news.items[id].committed = committed;
            });
            engagementsService.totalCommits('post', id).then(function(totalCommits){
              news.items[id].totalCommits = totalCommits;
            });
          }
          //make it available to the directive to officially show/hide, toggle
          $scope.news = news;
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
