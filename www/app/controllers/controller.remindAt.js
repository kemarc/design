angular.module('module.view.remind', [])
	.controller('remindCtrl', function($scope,$rootScope,$state) {

		$scope.closeRemindAt = function () {
                    $scope.modalRemindAt.hide();
                };
});