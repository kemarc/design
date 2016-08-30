angular.module('service.engagements', [])
    .service('engagementsService', function () {

        return {
            getNotifications: function () {
                return _notifications;
            },

            showAlert: function (title, text, buttonText, buttonType, page) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    template: text,
                    buttons: [{ text: buttonText, type: buttonType }]
                });
                $timeout(function () {
                    alertPopup.close();
                }, 1500000);

                alertPopup.then(function (res) {
                    page != null ? $state.go(page) : '';
                    alertPopup.close();
                });
            }

        }
    });

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
