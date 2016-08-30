angular.module('service.engagements', [])
    .service('engagementsService', function () {
        var exists = function (type, category, catId, itemId) {
            var arr = [type, category, catId, 'items', itemId];
            var db = firebase.database();
            //check type
            var refId = arr.slice(0, 1);
            return db.ref(refId).once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    //check type/category
                    var refId = arr.slice(0, 2).join('/');
                    return db.ref(refId).then(function (snapshot) {
                        var currentObj = snapshot.val();
                        if (currentObj) {
                            //check type/category/catId
                            var refId = arr.slice(0, 3).join('/');
                            return db.ref(refId).then(function (snapshot) {
                                var currentObj = snapshot.val();
                                if (currentObj) {
                                    //check type/category/catId/items
                                    var refId = arr.slice(0, 4).join('/');
                                    return db.ref(refId).then(function (snapshot) {
                                        var currentObj = snapshot.val();
                                        if (currentObj) {
                                            //check type/category/catId/items/itemId
                                            var refId = arr.slice(0, 5).join('/');
                                            return db.ref(refId).then(function (snapshot) {
                                                var currentObj = snapshot.val();
                                                if (currentObj) {
                                                    //type/category/catId/items/itemId exists
                                                    return true;
                                                }
                                                //type/category/catId/items exists
                                                return arr.slice(0, 4);
                                            });
                                        }
                                        //type/category/catId exists
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
        var get = function (type, category, catId, itemId) {
            var refId = [type, category, catId, 'items', itemId].join('/');
            var items = (itemId) ? firebase.database().ref(refId) : firebase.database().ref(type);
            return posts.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    return currentObj;
                }
                return undefined;
            });
        };

        var create = function (type, category, catId, itemId) {
            var exists = exists(type, category, catId, itemId);
            //create a location in the table
            //check type
            //check type/category
            //check type/category/catId
            //check type/category/catId/items
            //check type/category/catId/items/itemId
            var arr = [type, category, catId, 'items', itemId];
            var db = firebase.database();

            if (typeof (exists) === 'string') {
                //if exists is type
                if (exists === arr.slice(0, 1)) {
                    db.ref(arr.slice(0, 1));
                } else if (exists === arr.slice(0, 2)) {
                    db.ref(arr.slice(0, 2));
                } else if (exists === arr.slice(0, 3)) {
                    db.ref(arr.slice(0, 3));
                } else if (exists === arr.slice(0, 4)) {
                    db.ref(arr.slice(0, 4));
                } else if (exists === arr.slice(0, 5)) {
                    db.ref(arr.slice(0, 5));
                }
            } else if (!exists) {
                var final = {};
                final[type] = {};
                final[type][category] = {};
                final[type][category][catId] = {};
                final[type][category][catId].items = {};
                final[type][category][catId].items[itemId] = {
                    "created": firebase.database.ServerValue.TIMESTAMP,
                    "lastModified": firebase.database.ServerValue.TIMESTAMP,
                    "state": {
                        "actionable": true,
                        "visible": true,
                        "active": true
                    }
                };
            } else if (exists) {
                update(type, category, catId, itemId);
            } else {

            }
            var db = firebase.database().ref();
            var items = db.child(type);
            var key = items.push(obj).key;

            return key;
        };

        var update = function (type, typeId, itemId, userId, created, lastModified, actionable, visible, active) {
            var items = firebase.database().ref(type + '/' + typeId);
            return items.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    var obj = {
                        "itemId": itemId ? itemId : currentObj.itemId,
                        "createdBy": userId ? userId : currentObj.createdBy,
                        "created": created ? created : currentObj.created,
                        "lastModified": lastModified ? lastModified : firebase.database.ServerValue.TIMESTAMP,
                        "state": {
                            "actionable": actionable ? actionable : currentObj.state.actionable,
                            "visible": visible ? visible : currentObj.state.visible,
                            "active": active ? active : !currentObj.state.active
                        }
                    };
                    return items.update(obj);
                }
                return null;
            });
        };

        var del = function (type, typeId) {
            var item = firebase.database().ref(type + '/' + typeId);
            return posts.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    return items.remove();
                }
                return null;
            });
        };

        this.like = function (type, itemId, userId) {
            //check if engagement item is already in hash
            var like = get('likes', type);
            //if it exists then 
            if (like) {
                if (type in like) {

                } else {

                }
                //create
            }

        };
    });

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
