angular.module('module.view.post', [])
	.controller('postCtrl', function($scope,$rootScope,$state,postService,$localStorage,$ionicHistory,$ionicPopup,$cordovaSocialSharing,postService,engagementsService,$stateParams) {

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

        $scope.share = function (post) {
            document.addEventListener("deviceready", function () {
                $cordovaSocialSharing.share(post.summary, post.title, post.image)
                    .then(function (result) {
                        postService.showAlert('Post Shared', result, 'Ok', 'button-balanced', null);
                    }, function (err) {
                        postService.showAlert('Error Occured', err, 'Ok', 'button-assertive', null);
                    });
            }, false);
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
                post.likes.splice(_.findIndex(post.likes, ['name', $localStorage.userName]));
            } else {
                $scope.liked = true;
                post.likes.push({ name: $localStorage.userName, photo: $localStorage.userPhoto, publishedDate: new Date() });
            }
        };

        $scope.commit = function (post) {
            post.commits === undefined ? post.commits = [] : null;
            if ($scope.commited == true) {
                $scope.commited = false;
                post.commits.splice(_.findIndex(post.commits, ['name', $localStorage.userName]));
            } else {
                $scope.commited = true;
                post.commits.push({ name: $localStorage.userName, photo: $localStorage.userPhoto, publishedDate: new Date() });
            }
        };

});
