angular.module('service.engagements', [])
    .service('engagementService', function () {
        //check if user has already engaged with this item
        var engaged = function (type, category, categoryId, itemId) {
            var arr = [type, category, categoryId, itemId];
            var db = firebase.database();
            //check type
            var refId = arr.slice(0, 1).join('');
            return db.ref(refId).once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    //check type/category
                    var refId = arr.slice(0, 2).join('/');
                    return db.ref(refId).once('value').then(function (snapshot) {
                        var currentObj = snapshot.val();
                        if (currentObj) {
                            //check type/category/categoryId
                            var refId = arr.slice(0, 3).join('/');
                            return db.ref(refId).once('value').then(function (snapshot) {
                                var currentObj = snapshot.val();
                                if (currentObj) {
                                    //check type/category/categoryId/itemId
                                    var refId = arr.slice(0, 4).join('/');
                                    return db.ref(refId).once('value').then(function (snapshot) {
                                        var currentObj = snapshot.val();
                                        if (currentObj) {
                                            return true;
                                        }
                                        //type/category/categoryId exists
                                        return arr.slice(0, 3);
                                    });
                                }
                                //type/category/ exists
                                return arr.slice(0, 2);
                            });
                        }
                        //type exists
                        return arr.slice(0, 1);
                    });
                }
                //nothing exists
                return false;
            });
        };

        //returns true when engagement successfully registers in db, returns false otherwise.
        var updateEngagement = function (type, category, categoryId, itemId, active) {
            //check if there has been this type of engagement on this post
            return engaged(type, category, categoryId, itemId).then(function (exists) {
                if (exists instanceof Array || exists === false) {
                    var len = exists instanceof Array ? exists.length : 0;
                    var final = {};

                    if (len === 0) {
                        final[type] = {};
                        final[type][category] = {};
                        final[type][category][categoryId] = {};
                        final[type][category][categoryId][itemId] = {
                            "created": firebase.database.ServerValue.TIMESTAMP,
                            "lastModified": firebase.database.ServerValue.TIMESTAMP,
                            "state": {
                                "actionable": true,
                                "visible": true,
                                "active": active ? (active) : true
                            }
                        };
                    } else if (len == 1) {
                        final[category] = {};
                        final[category][categoryId] = {};
                        final[category][categoryId][itemId] = {
                            "created": firebase.database.ServerValue.TIMESTAMP,
                            "lastModified": firebase.database.ServerValue.TIMESTAMP,
                            "state": {
                                "actionable": true,
                                "visible": true,
                                "active": active ? (active) : true
                            }
                        };
                    } else if (len == 2) {
                        final[categoryId] = {};
                        final[categoryId][itemId] = {
                            "created": firebase.database.ServerValue.TIMESTAMP,
                            "lastModified": firebase.database.ServerValue.TIMESTAMP,
                            "state": {
                                "actionable": true,
                                "visible": true,
                                "active": active ? (active) : true
                            }
                        };
                    } else if (len == 3) {
                        final[itemId] = {
                            "created": firebase.database.ServerValue.TIMESTAMP,
                            "lastModified": firebase.database.ServerValue.TIMESTAMP,
                            "state": {
                                "actionable": true,
                                "visible": true,
                                "active": active ? (active) : true
                            }
                        };
                    } else if (len == 4) {
                        final = {
                            "created": firebase.database.ServerValue.TIMESTAMP,
                            "lastModified": firebase.database.ServerValue.TIMESTAMP,
                            "state": {
                                "actionable": true,
                                "visible": true,
                                "active": active ? (active) : true
                            }
                        }
                    }

                    if(len > 1){
                        var refId = exists.join('/');
                    }else if(len === 1){
                        var refId = exists.join('');
                    }

                    var db = (typeof (exists) === 'boolean' || len === 0) ? firebase.database().ref() : firebase.database().ref(refId);
                    return db.update(final).then(function () {
                        //successfully saved
                        return true;
                    }, function () {
                        //failed
                        return false;
                    });
                }

                var arr = [type, category, categoryId];
                var refId = arr.join('/');
                var db = firebase.database().ref(refId);
                return db.once('value').then(function (snapshot) {
                    var prev = snapshot.val();
                    if (prev && itemId in prev) {
                        prev = prev[itemId];
                    }
                    var final = {};
                    final[itemId] = {
                        "created": prev.created,
                        "lastModified": firebase.database.ServerValue.TIMESTAMP,
                        "state": {
                            "actionable": prev.state.actionable,
                            "visible": prev.state.visible,
                            "active": typeof (active) !== 'undefined' ? active : !prev.state.active
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
            });
        };

        this.like = function (category, categoryId, itemId, userId) {
            var type = 'engagementLikes';
            //check if engagement item is already in hash
            return updateEngagement(type, category, categoryId, userId, true);
        };

        this.unlike = function (category, categoryId, itemId, userId) {
            var type = 'engagementLikes';
            //check if engagement item is already in hash
            return updateEngagement(type, category, categoryId, userId, false);
        };

        this.commit = function (category, categoryId, itemId, userId) {
            var type = 'engagementCommits';
            //check if engagement item is already in hash
            return updateEngagement(type, category, categoryId, userId, true);
        };

        this.uncommit = function (category, categoryId, itemId, userId) {
            var type = 'engagementsCommits';
            //check if engagement item is already in hash
            return updateEngagement(type, category, categoryId, userId, false);
        };

        this.accept = function (category, categoryId, itemId, userId) {
            var type = 'engagementsAccepts';
            //check if engagement item is already in hash
            return updateEngagement(type, category, categoryId, userId, true);
        };

        this.reject = function (category, categoryId, itemId, userId) {
            var type = 'engagementsAccepts';
            //check if engagement item is already in hash
            return updateEngagement(type, category, categoryId, userId, false);
        };

    });
