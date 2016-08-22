angular.module('module.view.conversations', [])
	.controller('conversationsCtrl', function($scope,$rootScope,$state,$ionicPopover,conversationService,postService,engagementsService,$ionicScrollDelegate) {
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

		$scope.contactPopover = $ionicPopover.fromTemplate(contactTemplate, {
                    scope: $scope
                });

		$scope.searchPopover = $ionicPopover.fromTemplate(searchTemplate, {
                    scope: $scope
                });

                var randomMessages = conversationService.getRandomMessages()
                $scope.conversations = conversationService.getMessages();
                var viewScroll = $ionicScrollDelegate.$getByHandle('chatScroll');
                var footerBar, scroller, txtInput;

                $scope.$on('$ionicView.beforeEnter', function () {
                    $state.is('tabs.chat') ? $scope.chat = {} : null;
                });

                $scope.$on('$ionicView.enter', function () {
                    if ($state.is('tabs.chat')) {
                        $scope.chat = {};
                        conversationService.Loading('show');
                        if ($stateParams.chat == null) {
                            $scope.chat = postService.getRandomObject($scope.conversations);
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
                            conversationService.Loading();
                        }, 250);

                        $timeout(function () {
                            viewScroll.scrollBottom(true);
                            footerBar = document.body.querySelector('#chat .bar-footer');
                            scroller = document.body.querySelector('#chat .scroll-content');
                        }, 0);
                    }
                });

                $scope.sendChat = function (item) {
                    conversationService.KeepKeyboardOpen('#textChat');
                    var message = {
                        sentAt: new Date(),
                        name: $rootScope.user.name,
                        photo: $rootScope.user.photo,
                        text: item,
                        senderid: $rootScope.user.id
                    };

                    $timeout(function () {
                        $scope.chat.messages.push(message);
                        conversationService.KeepKeyboardOpen('#textChat');
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

                        conversationService.KeepKeyboardOpen('#textChat');
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
                    var message = {
                        sentAt: new Date(),
                        name: $rootScope.user.name,
                        photo: $rootScope.user.photo,
                        senderid: $rootScope.user.id
                    };
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
                                        $cordovaCamera.getPicture(conversationService.getCameraOptions()).then(function (imageData) {
                                            message.text = '<img src="' + "data:image/jpeg;base64," + imageData + '" style="max-width: 300px">';
                                            $timeout(function () {
                                                $scope.chat.messages.push(message);
                                                viewScroll.scrollBottom(true);
                                            }, 0);
                                        }, function (err) {
                                            engagementsService.showAlert('Error', err, 'Close', 'button-assertive', null);
                                        });
                                    }, false);
                                    break;
                                case 1: // Select From Gallery
                                    document.addEventListener("deviceready", function () {
                                        $cordovaCamera.getPicture(conversationService.getLibraryOptions()).then(function (imageData) {
                                            message.text = '<img src="' + "data:image/jpeg;base64," + imageData + '" style="width: 500px;height:500px">';
                                            $timeout(function () {
                                                $scope.chat.messages.push(message);
                                                viewScroll.scrollBottom(true);
                                            }, 0);
                                        }, function (err) {
                                            engagementsService.showAlert('Error', err, 'Close', 'button-assertive', null);
                                        });
                                    }, false);
                                    break;
                            }
                            return true;
                        }
                    });
                };

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

});
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