angular.module('service.appointments', [])
 .service('appointmentsService', function(){
   var table = 'activities';
        var get = function (id) {
            var refId = (id) ? [table, id].join('/'): table;
            var db = firebase.database().ref(refId);
            return db.once('value').then(function (snapshot) {
                  var currentObj = snapshot.val();
                  if (currentObj) {
                      return currentObj;
                  }
                  return undefined;
              });
        };

        var create = function (data) {
            //create a location in the table
            var obj = {
                "description": data.description,
                "created": firebase.database.ServerValue.TIMESTAMP,
                "createdBy": $localStorage.account.userId,
                "owner": $localStorage.account.userName,
                "location": data.location,
                "time": data.time,
                "date": data.date,
                "postType": data.postType,
                "state": {
                    "actionable": true,
                    "visible": true,
                    "active": true
                }
            };

            var db = firebase.database().ref(table);
            var key = db.push(obj).key;
            return key;
        };

        var update = function (data) {
            //reference to data record
            var refId = [table, data.id].join('/');
            //firebase db promise to top level data object.
            var db = firebase.database().ref(refId);
            //
            return db.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    var obj = {
                        "typeId": data.postTypeId ? data.postTypeId : currentObj.postTypeId,
                        "activityId": data.activityId ? data.activityId : currentObj.activityId,
                        "description": data.description ? data.description : currentObj.description,
                        "location": data.location ? data.location : currentObj.location,
                        "filePath": data.filePath ? data.filePath : currentObj.filePath,
                        "time": data.time ? data.time : currentObj.time,
                        "date": data.date ? data.date : currentObj.date,
                        "postType": data.postType ? data.postType : currentObj.postType,
                        "created": data.created ? data.created : currentObj.created,
                        "lastModified": firebase.database.ServerValue.TIMESTAMP,
                        "createdBy": data.createdBy ? data.createdBy : currentObj.createdBy,
                        "state": {
                            "actionable": actionable ? actionable : currentObj.actionable,
                            "visible": visible ? visible : currentObj.visible,
                            "active": active ? active : currentObj.active
                        }
                    };
                    return db.update(obj);
                }
                return null;
            });
        };

        var remove = function (id) {
            //firebase refID
            var refId = [table, id, 'state'].join('/');
            //reference to firebase db
            var db = firebase.database().ref(refId);
            return db.once('value').then(function (snapshot) {
                //current data. this ensures that this record exists before we attempt to remove
                var currentObj = snapshot.val();
                if (currentObj) {
                    var obj = {
                            "actionable": false,
                            "visible": false,
                            "active": false
                    };
                    return db.update(obj);
                }
                return null;
            });
        };

        //public services
        this.create = create;
        this.update = update;
        this.remove = remove;
        this.get = get;

});
