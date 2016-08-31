(function () {

    'use strict'

    angular.module('full_starter.controllers', [
        'mwl.calendar',
        'angularMoment',
        'ion-affix',
        'ngCordova',
        'monospaced.elastic',
        'ngLodash',
        'ion-datetime-picker',
        'ion-google-place',
        'module.view.login',
        'module.view.signup',
        'module.view.rather',
        'module.view.news',
        'module.view.post',
        'module.view.commits',
        'module.view.likes',
        'module.view.comments',
        'module.view.match',
        'module.view.cost',
        'module.view.event',
        'module.view.contacts',
        'module.view.friend',
        'module.view.coach',
        'module.view.trainers',
        'module.view.plans',
        'module.view.calendar',
        'module.view.conversations',
        'module.view.chat',
        'module.view.profile',
        'module.view.editProfile',
        'module.view.schedule',
        'module.view.commitList',
        'module.view.commentList',
        'module.view.likeList',
        'module.view.partners',
        'module.view.sentPlans',
        'module.view.reminders',
        'module.view.settings',
        'module.view.interest',
        'module.view.status',
        'module.view.notifications',
        'module.view.thanks',
        'module.view.explore',
        'module.view.leader',
        'module.view.editReminder',
        'module.view.remind',
        'module.view.editEvent',
        'module.view.forgot'
    ])

        .controller('appCtrl', function ($rootScope, $state, $scope, $stateParams, appService, $ionicHistory, $ionicPopover, $ionicPopup, $ionicModal,
            $ionicScrollDelegate, $ionicLoading, $ionicActionSheet, $cordovaCamera, $cordovaSocialSharing, $cordovaGeolocation, $timeout,$ionicSideMenuDelegate) {

            initIntro();
            initNews();
            initProfile();
            initDashboard();
            initShop();
            initChat();
            initCalendar();
            initAnimate();


            function initAnimate() {
                function testAnim(x) {
                    $('#animationSandbox').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $(this).removeClass();
                    });
                };

                $(document).ready(function () {
                    $('.js--triggerAnimation').click(function (e) {
                        e.preventDefault();
                        var anim = $('.js--animations').val();
                        testAnim(anim);
                    });

                    $('.js--animations').change(function () {
                        var anim = $(this).val();
                        testAnim(anim);
                    });
                });
            }
            // models
            $scope.starterScreen = function() {
                $rootScope.user = {
                    id: 1,
                    name: 'Adam Ionic',
                    email: 'adamionic@email.com',
                    photo: 'img/users/1.jpg',
                    city: 'Cambridge, United Kingdom'
                }
                $scope.contacts = appService.getContacts();
                $scope.searchPopover = $ionicPopover.fromTemplate(searchTemplate, {
                    scope: $scope
                });
                $scope.getSearch = function (search) {
                    $scope.searchFilter = search;
                }

                $cordovaGeolocation.getCurrentPosition({ timeout: 10000, enableHighAccuracy: true }).then(
                    function (position) {
                        $rootScope.currentLocation = [position.coords.latitude, position.coords.longitude];
                    });

                $scope.goTo = function (page) {
                    $scope.closeAll();//Close all Modals
                    $state.go(page);
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
                }

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
                }

                $scope.signOut = function () {
                    $ionicLoading.show({
                        template: 'Signing out...'
                    });
                    $timeout(function () {
                        $ionicLoading.hide();
                        $scope.goTo('authentication');
                    }, 2000);

                }
            }
            // intro
            function initIntro() {

                //Sign Up Modal
                $scope.uploadUserPhoto = function () {
                    $ionicActionSheet.show({
                        buttons: [{
                            text: 'Take Picture'
                        }, {
                                text: 'Select From Gallery'
                            }],
                        buttonClicked: function (index) {
                            switch (index) {
                                case 0: // Take Picture
                                    document.addEventListener("deviceready", function () {
                                        $cordovaCamera.getPicture(appService.getCameraOptions()).then(function (imageData) {
                                            alert(imageData);
                                            $rootScope.user.photo = "data:image/jpeg;base64," + imageData;
                                        }, function (err) {
                                            appService.showAlert('Error', err, 'Close', 'button-assertive', null);
                                        });
                                    }, false);

                                    break;
                                case 1: // Select From Gallery
                                    document.addEventListener("deviceready", function () {
                                        $cordovaCamera.getPicture(appService.getLibraryOptions()).then(function (imageData) {
                                            $rootScope.user.photo = "data:image/jpeg;base64," + imageData;
                                        }, function (err) {
                                            appService.showAlert('Error', err, 'Close', 'button-assertive', null);
                                        });
                                    }, false);
                                    break;
                            }
                            return true;
                        }
                    });
                };

            }

            // news
            function initNews() {

            }

            // profile
            function initProfile() {
                $scope.profile = { type: 1 };


            }

            // dashboard
            function initDashboard() {

                $scope.viewDate = new Date();
                $scope.notifyTimes = ['at set time', '15 mins before', '30 mins before', '45 mins before', 'an hour before'];
                $scope.notifications = appService.getNotifications();
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

                if ($state.is('create-edit-reminder')) {
                    $stateParams.reminder !== null ? $scope.reminder = angular.copy($stateParams.reminder) : $scope.reminder = { type: 'Add Task', startsAt: new Date(), endsAt: new Date(), allDay: true, remindTime: [] };
                    $stateParams.type !== null ? $scope.reminder.type = angular.copy($stateParams.type) : null;
                }

                $scope.reminderPopover = $ionicPopover.fromTemplate(reminderTemplate, {
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

                $scope.gotoFriend = function () {
                    $state.go('tabs.friend');

                }

                $scope.gotoLeader = function () {
                    $state.go('tabs.leader');

                }


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
                        appService.showAlert('Form Invalid', '<p class="text-center">A title and start date is required</p>', 'Ok', 'button-assertive', null);
                    }

                }

                 $scope.gotoExplore = function () {
                    $state.go('tabs.explore');

                }

            }

            // shop
            function initShop() {

                $scope.gotoContacts = function () {
                    $state.go('tabs.contacts');

                }

                $scope.gotoTrainers = function () {
                    $state.go('tabs.trainers');

                }

                $scope.makePayment = function () {
                    appService.Loading('show');
                    $timeout(function () {
                        appService.Loading();
                        $scope.goTo('tabs.thanks');
                    }, 2580);
                    Materialize.toast('<i class="icon ion-ios-checkmark-outline"></i> Payment has been successful', 4000)
                };

            }

            // calendar
            function initCalendar() {
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

            }

            // conversations & chat
            function initChat() {
                $scope.contactPopover = $ionicPopover.fromTemplate(contactTemplate, {
                    scope: $scope
                });

                var randomMessages = appService.getRandomMessages()
                $scope.conversations = appService.getMessages();
                var viewScroll = $ionicScrollDelegate.$getByHandle('chatScroll');
                var footerBar, scroller, txtInput;

                $scope.$on('$ionicView.beforeEnter', function () {
                    $state.is('tabs.chat') ? $scope.chat = {} : null;
                });

                $scope.$on('$ionicView.enter', function () {
                    if ($state.is('tabs.chat')) {
                        $scope.chat = {};
                        appService.Loading('show');
                        if ($stateParams.chat == null) {
                            $scope.chat = appService.getRandomObject($scope.conversations);
                        } else {
                            if ($stateParams.chat.conversation) {
                                $scope.chat = _.find($scope.conversations, ['conversation', $stateParams.chat.conversation]);
                            } else {
                                $scope.chat = {
                                    conversation: $scope.conversations.length + 1,
                                    recepientid: $stateParams.chat.id,
                                    recepientname: $stateParams.chat.name,
                                    recepientphoto: $stateParams.chat.photo,
                                    messages: []
                                }
                            }

                        }
                        $timeout(function () {
                            appService.Loading();
                        }, 250);

                        $timeout(function () {
                            viewScroll.scrollBottom(true);
                            footerBar = document.body.querySelector('#chat .bar-footer');
                            scroller = document.body.querySelector('#chat .scroll-content');
                        }, 0);
                    }
                });

                $scope.sendChat = function (item) {
                    appService.KeepKeyboardOpen('#textChat');
                    var message = {
                        sentAt: new Date(),
                        name: $rootScope.user.name,
                        photo: $rootScope.user.photo,
                        text: item,
                        senderid: $rootScope.user.id
                    };

                    $timeout(function () {
                        $scope.chat.messages.push(message);
                        appService.KeepKeyboardOpen('#textChat');
                        viewScroll.scrollBottom(true);
                    }, 0);

                    $scope.input = '';

                    $timeout(function () {
                        $scope.chat.messages.push({
                            sentAt: new Date(),
                            name: $scope.chat.recepientname,
                            photo: $scope.chat.recepientphoto,
                            text: randomMessages[Math.floor(Math.random() * randomMessages.length)],
                            senderid: $scope.chat.recepientid
                        });

                        appService.KeepKeyboardOpen('#textChat');
                        viewScroll.scrollBottom(true);
                    }, 2000);
                }

                $scope.onMessageHold = function (e, itemIndex, chat) {

                    $ionicActionSheet.show({
                        buttons: [{
                            text: 'Copy Text'
                        }, {
                                text: 'Delete Message'
                            }],
                        buttonClicked: function (index) {
                            switch (index) {
                                case 0:
                                    $cordovaClipboard.copy(chat.text).then(function () {
                                    }, function () {
                                    });
                                    break;
                                case 1:
                                    $scope.chat.messages.splice(itemIndex, 1);
                                    $timeout(function () {
                                        viewScroll.resize();
                                    }, 0);
                                    break;
                            }
                            return true;
                        }
                    });
                };

                $scope.sendPhoto = function () {
                    $ionicActionSheet.show({
                        buttons: [{
                            text: 'Take Picture'
                        }, {
                                text: 'Select From Gallery'
                            }],
                        buttonClicked: function (index) {
                            switch (index) {
                                case 0: // Take Picture
                                    document.addEventListener("deviceready", function () {
                                        $cordovaCamera.getPicture(appService.getCameraOptions()).then(function (imageData) {
                                            var userImage = '<img src="' + "data:image/jpeg;base64," + imageData + '" style="max-width: 300px">';
                                            $timeout(function () {
                                                viewScroll.scrollBottom(true);
                                            }, 0);
                                        }, function (err) {
                                            appService.showAlert('Error', err, 'Close', 'button-assertive', null);
                                        });
                                    }, false);
                                    break;
                                case 1: // Select From Gallery
                                    document.addEventListener("deviceready", function () {
                                        $cordovaCamera.getPicture(appService.getLibraryOptions()).then(function (imageData) {
                                            var userImage = '<img src="' + "data:image/jpeg;base64," + imageData + '" style="width: 500px;height:500px">';
                                            $timeout(function () {
                                                viewScroll.scrollBottom(true);
                                            }, 0);
                                        }, function (err) {
                                            appService.showAlert('Error', err, 'Close', 'button-assertive', null);
                                        });
                                    }, false);
                                    break;
                            }
                            return true;
                        }
                    });
                };

                // I emit this event from the monospaced.elastic directive, read line 480
                //add the following after line 168 of lib/angular-elastic/elastic.js
                //scope.$emit('taResize', $ta);
                $scope.$on('taResize', function (e, ta) {
                    console.log('taResize');
                    if (!ta) return;

                    var taHeight = ta[0].offsetHeight;
                    console.log('taHeight: ' + taHeight);

                    if (!footerBar) return;

                    var newFooterHeight = taHeight + 30;
                    newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

                    footerBar.style.height = newFooterHeight + 'px';
                    scroller.style.bottom = newFooterHeight + 'px';
                });
            }

        })

})();

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
var contactTemplate =
    '<ion-popover-view class="right large">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-avatar item-text-wrap" ng-click="contactPopover.hide($event);"ng-repeat="contact in contacts" ui-sref="tabs.chat({chat: contact})">' +
    '<img ng-src="{{contact.photo}}">' +
    '<h2 class="dark font-thin">{{contact.name}}</h2>' +
    '<p class="dark font-thin">{{contact.subject}}</p>' +
    '</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';

var newsTemplate =
    '<ion-popover-view class="medium right">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-icon-left item-text-wrap">' +
    '<i class="icon ion-ios-camera-outline" ng-click="createPost()"></i>Create Post' +
    '</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';

var reminderTemplate =
    '<ion-popover-view class="small center">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'Add Call\'})"><i class="icon ion-ios-telephone-outline"></i>Add Call</div>' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'Add Email\'})"><i class="icon ion-ios-at"></i>Add Email</div>' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'Add Task\'})"><i class="icon ion-ios-checkmark-outline"></i>Add Task</div>' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'Add Event\'})"><i class="icon ion-ios-calendar-outline"></i>Add Event</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';
