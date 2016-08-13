'use strict';

angular.module('directive.selectBox',[])
  .directive('selectBox', function () {
    return {
      templateUrl :'js/directives/selectBox.directive.html',
      transclude: true,
      scope:{
      	'comm': '='
      },
      restrict: 'EA',
      link: function(scope, element){
      	if(scope.comm){
      		var userId = element.find('.check-box').attr('userId');
      		var interestId = element.find('.check-box').attr('interestId');
      		console.log(element.find('.check-box'));
      		scope.items = scope.comm.items;
      		scope.manage = scope.comm.manage;
      		scope.comm.isChecked(userId, interestId).then(function(exists){
      			console.log({exists2: exists, userId: userId, interestId: interestId});
      			scope.checked = exists;
      		});
      	}
      }
    };
  });