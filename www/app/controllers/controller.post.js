angular.module('module.view.post', [])
	.controller('postCtrl', function($scope,$rootScope,$state,appService,$stateParams) {
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
                    items: appService.getNews()
        }

		if ($state.is('tabs.post-detail') || $state.is('tabs.commits') || $state.is('tabs.comments') || $state.is('tabs.likes')) {
                    $stateParams.post === null ? $scope.post = appService.getRandomObject($scope.news.items) : $scope.post = $stateParams.post;

        }

		$scope.showConfirm = function() {
   
                var confirmPopup = $ionicPopup.confirm({
                   title: 'Report Post',
                   template: ' Are you sure you want to report this post?'
                 });
                 confirmPopup.then(function(res) {
                   if(res) {
                   } else {
                   }
                 });
        };

        $scope.gotoFriend = function(){
        	$state.go('tabs.friend');
        }

       $scope.like = function (post) {
                    post.likes === undefined ? post.likes = [] : null;
                    if ($scope.liked == true) {
                        $scope.liked = false;
                        post.likes.splice(_.findIndex(post.likes, ['name', $rootScope.user.name]));
                    } else {
                        $scope.liked = true;
                        post.likes.push({ name: $rootScope.user.name, photo: $rootScope.user.photo, publishedDate: new Date() });
                    }
        };

        $scope.commit = function (post) {
                    post.commits === undefined ? post.commits = [] : null;
                    if ($scope.commited == true) {
                        $scope.commited = false;
                        post.commits.splice(_.findIndex(post.commits, ['name', $rootScope.user.name]));
                    } else {
                        $scope.commited = true;
                        post.commits.push({ name: $rootScope.user.name, photo: $rootScope.user.photo, publishedDate: new Date() });
                    }
        };

       $scope.share = function (post) {
                    document.addEventListener("deviceready", function () {
                        $cordovaSocialSharing.share(post.summary, post.title, post.image)
                            .then(function (result) {
                                appService.showAlert('Post Shared', result, 'Ok', 'button-balanced', null);
                            }, function (err) {
                                appService.showAlert('Error Occured', err, 'Ok', 'button-assertive', null);
                            });
                    }, false);
        };

});