angular.module('module.view.comments', [])
	.controller('commentsCtrl', function($scope,$rootScope,$state,$localStorage, postService,conversationService,$stateParams,$timeout,$ionicHistory) {
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

        $scope.news = {
                    type: 'image',
                    items: postService.getNews()
                }

        if ($state.is('tabs.post-detail') || $state.is('tabs.commits') || $state.is('tabs.comments') || $state.is('tabs.likes')) {
            $stateParams.post === null ? $scope.post = postService.getRandomObject($scope.news.items) : $scope.post = $stateParams.post;

        }

        $scope.gotoLikes = function () {
                    $state.go('tabs.likes');
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
        };

        $scope.gotoCommit = function () {
                    $state.go('tabs.commits');
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
        };

         $scope.sendChat = function (item) {
                    conversationService.KeepKeyboardOpen('#textChat');
                    var message = {
                        sentAt: new Date(),
												name: $localStorage.userName,
                        photo: $localStorage.userThumbnail,
												text: item,
                        senderid: $localStorage.account.userId
                    };

                    $timeout(function () {
                        $scope.chat.messages.push(message);
                        conversationService.KeepKeyboardOpen('#textChat');
                        viewScroll.scrollBottom(true);
                    }, 0);

                    $scope.input = '';

                    $timeout(function () {
                        $scope.chat.messages.push({
                            sentAt: new Date(),
                            name: $scope.chat.recepientname,
                            photo: $scope.chat.recepientphoto,
                            text: randomMessages[Math.floor(Math.random() * randomMessages.length)],
                            senderid: $scope.chat.recepientid
                        });

                        conversationService.KeepKeyboardOpen('#textChat');
                        viewScroll.scrollBottom(true);
                    }, 2000);
            }


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
});
