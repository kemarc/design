angular.module('module.view.likes', [])
	.controller('likesCtrl', function($scope,$rootScope,$state,$localStorage,$stateParams,postService,$ionicHistory,usersService) {
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
								console.log($stateParams);

								if($stateParams.post){
									console.log($stateParams);
								engagementService.likes('post', $stateParams.post).then(function(results) {
									  var likers = results;
										for(var id in likers){
											usersService.get(id).then(function(user){
												likers[id].profile = user;
												console.log({user: user, profile: likers[id].profile, id: id});
											});
										}
											$scope.likers = likers;
									});
								}

        // if ($state.is('tabs.post-detail') || $state.is('tabs.commits') || $state.is('tabs.comments') || $state.is('tabs.likes')) {
        //     $stateParams.post === null ? $scope.post = postService.getRandomObject($scope.news.items) : $scope.post = $stateParams.post;
				//
        // }

		$scope.gotoCommits = function () {
                    $state.go('tabs.commits');
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
        };

        $scope.gotoComments = function () {
                    $state.go('tabs.comment');
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
        };

       $scope.like = function (post) {
                    post.likes === undefined ? post.likes = [] : null;
                    if ($scope.liked == true) {
                        $scope.liked = false;
                        post.likes.splice(_.findIndex(post.likes, ['name', $localStorage.userName]));
                    } else {
                        $scope.liked = true;
                        post.likes.push({ name: $localStorage.userName, photo: $localStorage.userPhoto, publishedDate: new Date() });
                    }
        };


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
