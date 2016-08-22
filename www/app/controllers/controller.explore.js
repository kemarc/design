angular.module('module.view.explore', [])
	.controller('exploreCtrl', function($scope,$rootScope,$state,postService,$ionicSideMenuDelegate,$ionicPopover) {
        $scope.newsPopover = $ionicPopover.fromTemplate(newsTemplate, {
                    scope: $scope
        });

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


		$scope.gotoBrowse = function () {
                    $state.go('tabs.news');
                   
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

        $scope.searchPopover = $ionicPopover.fromTemplate(searchTemplate, {
                    scope: $scope
                });

        $ionicSideMenuDelegate.canDragContent(false);

        $scope.news = {
            type: 'image',
            items: postService.getNews()
        }

});

var newsTemplate =
    '<ion-popover-view class="medium right">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-icon-left item-text-wrap" ng-click="newsPopover.hide($event);">' +
    '<i class="icon ion-ios-camera-outline" ng-click="sendPhoto()"></i>Share Photo' +
    '</div>' +
    '<div class="item item-icon-left item-text-wrap" ng-click="newsPopover.hide($event);">' +
    '<i class="icon ion-ios-bell-outline" ng-click="sendPhoto()"></i>Share Event' +
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


