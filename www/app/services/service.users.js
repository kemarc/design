angular.module('service.users', [])
 .service('usersService', function(){
   var table = 'accounts';
   this.get = function (postId) {
       var posts = (postId) ? firebase.database().ref(table + '/' + postId) : firebase.database().ref(table);
       return posts.once('value').then(function (snapshot) {
             var currentObj = snapshot.val();
             if (currentObj) {
                 return currentObj;
             }
             return undefined;
         });
   };

   this.createNotifications = function(userId){
	    var data = {
	           "displayName": "Baseball",
             "deviceToken": {

             }
	    };

	    var ref = firebase.database().ref('account');

	    var key;

	    var interests = ['Baseball', 'Boxing','Basketball','Climbing','Cycling','Dance','Football','Golf','Jumping',
	              'Paintball','Pool','Skate','Soccer','Tennis','Weight Lifting', 'Yoga'];
	    for(var i = 0; i < interests.length; i++){
	      data = {
	           "displayName": interests[i],
             "users": [
               '-KPok87HRXv-p6_xbnEU'
             ],
	      };
	      key = ref.push().key;
	      ref.child(key).update(data);
    }
	    return;
	  };

});
