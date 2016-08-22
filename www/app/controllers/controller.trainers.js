angular.module('module.view.trainers', [])
	.controller('trainersCtrl', function($scope,$rootScope,$state,partnersService) {
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
                
		$scope.gotoLeader = function () {
                    $state.go('tabs.leader');
           
        };

        $scope.contacts = partnersService.getContacts();
});

    var _contacts = [
    {
        id: 3,
        "name": "Thomas Tank",
        "photo": "img/users/3.jpg",
        "desc": " Astronault"
    }, {
        "id": 4,
        "name": "Steven Spruse",
        "photo": "img/users/4.jpg",
        "desc": " Professor"
    },
    {
        id: 2,
        "name": "Rupert Bear",
        "photo": "img/users/2.jpg",
        "desc": " Software Developer"
    },
    {
        id: 5,
        "name": "Diana Cahill",
        "photo": "img/users/5.jpg",
        "desc": " Doctor"
    },
    {
        id: 6,
        "name": "Samuel Ross",
        "photo": "img/users/3.jpg",
        "desc": "Archeologist"
    },
    {
        "id": 7,
        "name": "Daily Bugle",
        "photo": "img/users/4.jpg",
        "desc": "News Reporter"
    },
    {
        "id": 8,
        "name": "Peter Vaughn",
        "photo": "img/users/2.jpg",
        "desc": "Chef"
    }
]
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