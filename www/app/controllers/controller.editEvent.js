angular.module('module.view.editEvent', [])
	.controller('editEventCtrl', function($scope,$rootScope,$state,engagementsService,$ionicPopover) {
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
		$scope.saveReminder = function () {
                    if ($scope.reminderForm.$valid) {
                        if ($stateParams.reminder === null) {
                            $rootScope.notifications.push($scope.reminder);
                        } else {
                            $rootScope.notifications.splice($rootScope.notifications.indexOf(_.find($rootScope.notifications, function (obj) { return obj == $stateParams.reminder })), 1, $scope.reminder);
                        }
                    } else {
                        engagementsService.showAlert('Form Invalid', '<p class="text-center">A title and start date is required</p>', 'Ok', 'button-assertive', null);
                    }

                }

        $scope.eventPopover = $ionicPopover.fromTemplate(eventTemplate, {
                    scope: $scope
                });

});
var eventTemplate =
    '<ion-popover-view class="small center" style="height: 58px !important;top: 602.422px;">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="eventPopover.hide($event);" ui-sref="create-edit-event({reminder: null, type: \'Add Event\'})"><i class="icon ion-ios-calendar-outline"></i>Add Event</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';
