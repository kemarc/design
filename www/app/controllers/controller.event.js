angular.module('module.view.event', [])
	.controller('eventCtrl', function($scope,$rootScope,$state,$localStorage, postService) {
    $scope.profile = $localStorage.account;
		
		
		$scope.createEvent = function() {
			var $inputs = $('.event-form .event__input input');
			var data = {};
			$inputs.map( function(elm) {
				data[$(this).attr('name')] = $(this).val();
			});
			
			var key = postService.create(data);
		};
		
		
});
