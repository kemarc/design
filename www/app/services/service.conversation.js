angular.module('service.conversation', [])
 .service('conversationService', function($ionicLoading){

       return {
                    getMessages: function () {
                        return _messages;
                    },
                    getContacts: function () {
                        return _contacts;
                    },
                    getRandomMessages: function () {
                        return _randMessages;
                    },
                    getRandomObject: function (arr) {
                        return arr[Math.floor(Math.random() * arr.length)];
                    },
                    Loading: function (params) {
                        if (params === 'show') {
                            $ionicLoading.show({
                                template: '<ion-spinner></ion-spinner>'
                            });
                        } else {
                            $ionicLoading.hide();
                        }
                    },
                    KeepKeyboardOpen: function (params) {
                        var txtInput = angular.element(document.body.querySelector(params));
                        txtInput.one('blur', function () {
                            txtInput[0].focus();
                        });
                    },

                    getCameraOptions: function () {
                        return {
                            quality: 80,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.CAMERA,
                            encodingType: Camera.EncodingType.JPEG,
                            saveToPhotoAlbum: true,
                            correctOrientation: true,
                        };
                    },
                    getLibraryOptions: function () {
                        return {
                            quality: 80,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                            encodingType: Camera.EncodingType.JPEG,
                            saveToPhotoAlbum: false,
                            correctOrientation: true,
                        };
                    },
                }
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