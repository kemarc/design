angular.module('module.view.calendar', [])
	.controller('calendarCtrl', function($scope,$rootScope,$state,engagementsService,$ionicPopover,$ionicModal) {
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

		$scope.viewDate = new Date();
                $scope.notifyTimes = ['at set time', '15 mins before', '30 mins before', '45 mins before', 'an hour before'];
                $scope.notifications = engagementsService.getNotifications();
                getDateEvents(moment($scope.viewDate._d).startOf('day')._d);

                $scope.decrementDate = function (item) {
                    if (angular.isUndefined($scope.viewDate._d)) $scope.viewDate = moment($scope.viewDate).startOf('day').subtract(1, 'days');
                    else $scope.viewDate = moment($scope.viewDate._d).startOf('day').subtract(1, 'days');
                    getDateEvents($scope.viewDate._d)
                };

                $scope.incrementDate = function (item) {
                    if (angular.isUndefined($scope.viewDate._d)) $scope.viewDate = moment($scope.viewDate).startOf('day').add(1, 'days');
                    else $scope.viewDate = moment($scope.viewDate._d).startOf('day').add(1, 'day');
                    getDateEvents($scope.viewDate._d)
                };
                function getDateEvents(date) {
                    var range = moment().range(date, moment(date).endOf('day'));
                    $scope.seletedDateEvents = [];
                    angular.forEach($scope.notifications, function (value, key) {
                        if (moment(value.startsAt).within(range)) {
                            $scope.seletedDateEvents.push(value);
                        }
                    });
                }

                if ($state.is('create-edit-event')) {
                    $stateParams.reminder !== null ? $scope.reminder = angular.copy($stateParams.reminder) : $scope.reminder = { type: 'Add Task', startsAt: new Date(), endsAt: new Date(), allDay: true, remindTime: [] };
                    $stateParams.type !== null ? $scope.reminder.type = angular.copy($stateParams.type) : null;
                }

                 $scope.eventPopover = $ionicPopover.fromTemplate(eventTemplate, {
                    scope: $scope
                });

                $ionicModal.fromTemplateUrl('app/dashboard/remind-at-modal.html', {
                    scope: $scope,
                    animation: 'fade-in-scale'
                }).then(function (modal) {
                    $scope.modalRemindAt = modal;
                });
                $scope.openRemindAt = function () {
                    $scope.modalRemindAt.show();
                };

                $scope.closeRemindAt = function () {
                    $scope.modalRemindAt.hide();
                };

                $scope.notifyCheck = function (index, item) {
                    if (angular.isUndefined($scope.reminder.remindTime[index])) {
                        $scope.reminder.remindTime[index] = item;
                    } else {
                        $scope.reminder.remindTime[index] = false;
                    }
                }

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
    $scope.calendarView = 'month';
                $scope.viewDate = new Date();
                $scope.events = $scope.notifications;

                $scope.eventClicked = function (event) {
                    //alert.show('Clicked', event);
                };

                $scope.eventEdited = function (event) {
                    //alert.show('Edited', event);
                };

                $scope.eventDeleted = function (event) {
                    //alert.show('Deleted', event);
                };

                $scope.eventTimesChanged = function (event) {
                    //alert.show('Dropped or resized', event);
                };

                $scope.toggle = function ($event, field, event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    event[field] = !event[field];
                };

                $scope.viewChangeClicked = function (nextView, date) {
                    $scope.viewDate = date;
                    $scope.seletedDateEvents = [];
                    if (nextView === 'day') {
                        angular.forEach($scope.events, function (value, key) {
                            var range = moment().range(value.startsAt, value.endsAt);
                            if (range.contains(date)) {
                                $scope.seletedDateEvents.push(value);
                            }
                        });
                        return false;
                    }
                };

                $scope.getDayEvents = function () {
                    $scope.selectedDate = new Date();
                    angular.forEach($scope.events, function (value, key) {
                        var range = moment().range(value.startsAt, value.endsAt);
                        if (range.contains(new Date())) {
                            $scope.seletedDateEvents.push(value);
                        }
                    });
                }


});

moment.locale('en', {
    calendar: {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow, ] MMM Do dddd',
        lastWeek: '[Last] MMM Do dddd',
        nextWeek: 'MMM Do dddd',
        sameElse: 'L'
    }
})

var eventTemplate =
    '<ion-popover-view class="small center" style="height: 58px !important;top: 602.422px;">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-text-wrap padding item-icon-left" ui-sref="create-edit-event({event: null, type: \'Add Event\'})" href = "#/create-edit-event"><i class="icon ion-ios-calendar-outline"></i>Add Event</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';
