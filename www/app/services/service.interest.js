angular.module('service.interest', ['firebase'])
 .service('interestService',function() {
   this.createInterestList = function(userId){
	    var data = {
	           "displayName": "Baseball",
	           "states": {
	             "actionable": true,
	             "read": true,
	             "write": true
	           }
	    };

	    var ref = firebase.database().ref('interest');

	    var key;

	    var interests = ['Baseball', 'Boxing','Basketball','Climbing','Cycling','Dance','Football','Golf','Jumping',
	              'Paintball','Pool','Skate','Soccer','Tennis','Weight Lifting', 'Yoga'];
	    for(var i = 0; i < interests.length; i++){
  	      data = {
  	           "displayName": interests[i],
  	           "states": {
  	             "actionable": true,
  	             "read": true,
  	             "write": true
  	           }
  	      };
  	      key = ref.push().key;
  	      ref.child(key).set(data);
      }
	    return;
	  };


	  this.get = function(id){
      console.log('in interest.get');
      var intresets = (id) ? firebase.database().ref('interest/' + id) : firebase.database().ref('interest');
      return intresets.once('value').then(function (snapshot) {
          var currentObj = snapshot.val();
          if (currentObj) {
              return currentObj;
          }
          return undefined;
      });
    };

 });
