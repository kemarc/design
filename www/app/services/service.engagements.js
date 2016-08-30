angular.module('service.engagements', [])
    .service('engagementService', function () {
        //check if user has already engaged with this item
        var engaged = function (type, category, categoryId, itemId) {
            var arr = [type, category, categoryId, 'items'];
            var refId = arr.join('/');
            var db = firebase.database().ref(refId);
            return db.on('value', function (snapshot) {
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
        var updateEngagement = function (type, category, categoryId, itemId, active) {
            //check if there has been this type of engagement on this post
            var exists = engaged(type, category, categoryId, itemId);
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
                        "active": active ? (active) : true
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
            var db = firebase.database().ref(refId);
            return db.on('value', function (snapshot) {
                var prev = snapshot.val();
                if (!prev) {
                    final = {
                        items: {}
                    };
                    final = final.items;
                }
                final[itemId] = {
                    "created": prev ? prev.created : firebase.database.ServerValue.TIMESTAMP,
                    "lastModified": prev ? prev.lastModified : firebase.database.ServerValue.TIMESTAMP,
                    "state": {
                        "actionable": prev ? prev.actionable : true,
                        "visible": prev? prev.visible : true,
                        "active": active ? (active) : (prev)? !prev.active: true
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

        this.like = function (category, categoryId, itemId, userId) {
            var type = 'likes';
            //check if engagement item is already in hash
            return updateEngagement(type, category, categoryId, userId, true);
        };

        this.unlike = function (category, categoryId, itemId, userId) {
            var type = 'likes';
            //check if engagement item is already in hash
            return updateEngagement(type, category, categoryId, userId, false);
        };

        this.commit = function (category, categoryId, itemId, userId) {
            var type = 'commits';
            //check if engagement item is already in hash
            return updateEngagement(type, category, categoryId, userId, true);
        };

        this.uncommit = function (category, categoryId, itemId, userId) {
            var type = 'commits';
            //check if engagement item is already in hash
            return updateEngagement(type, category, categoryId, userId, false);
        };

        this.accept = function (category, categoryId, itemId, userId) {
            var type = 'accepts';
            //check if engagement item is already in hash
            return updateEngagement(type, category, categoryId, userId, true);
        };

        this.reject = function (category, categoryId, itemId, userId) {
            var type = 'accepts';
            //check if engagement item is already in hash
            return updateEngagement(type, category, categoryId, userId, false);
        };

    });
