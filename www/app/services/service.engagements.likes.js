angular.module('service.engagements', [])
    .service('engagementsService', function () {
        //check if user has already engaged with this item
        //
        var exists = function (type, category, categoryId, itemId) {
            var arr = [type, category, categoryId, 'items'];
            var refId = arr.join('/');
            var db = firebase.database(refId);
            return db.on('value').then(function (snapshot) {
                var prev = snapshot.val();
                var hasEngaged = false;
                //has anyone engaged
                if (prev) {
                    hasEngaged = true;
                    if (!itemId in prev) {
                        hasEngaged = false;
                    }
                }
                return hasEngaged;
            });
        };
        //returns true when engagement successfully registers in db, returns false otherwise.
        var toggleEngagement = function (type, category, categoryId, itemId) {
            //check if there has been this type of engagement on this post
            var exists = exists(type, category, categoryId);
            var final = {};
            if (!exists) {
                final[type] = {};
                final[type][category] = {};
                final[type][category][categoryId] = {};
                final[type][category][categoryId].items = {};
                final[type][category][categoryId].items[itemId] = {
                    "created": firebase.database.ServerValue.TIMESTAMP,
                    "lastModified": firebase.database.ServerValue.TIMESTAMP,
                    "state": {
                        "actionable": true,
                        "visible": true,
                        "active": true
                    }
                };
                var db = firebase.database().ref();
                return db.set(final).then(function () {
                    //successfully saved
                    return true;
                }, function () {
                    //failed
                    return false;
                });
            }
            var arr = [type, category, categoryId, 'items'];
            var refId = arr.join('/');
            var db = firebase.database(refId);
            return db.on('value', function (snapshot) {
                var prev = snapshot().val();
                final[itemId] = {
                    "created": prev.created,
                    "lastModified": firebase.database.ServerValue.TIMESTAMP,
                    "state": {
                        "actionable": prev.actionable,
                        "visible": prev.visible,
                        "active": !prev.active
                    }
                };
                return db.update(final).then(function () {
                    //successfully saved
                    return true;
                }, function () {
                    //failed
                    return false;
                });
            });

        };

        this.togglelike = function (category, categoryId, itemId, userId) {
            var type = 'likes';
            //check if engagement item is already in hash
            return toggleEngagement(type, category, categoryId, userId);
        };
    });

