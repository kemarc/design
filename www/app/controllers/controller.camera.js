angular.module('module.view.camera', [])
	.controller('cameraCtrl', function($scope,$rootScope,$state,$localStorage) {
    $scope.profile = $localStorage.account;
});
