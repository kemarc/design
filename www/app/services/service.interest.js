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
	      ref.child(key).update(data);
    }
	    return;
	  };

	  this.getInterest = function(id){
    id = id? id: '';
    var interestFireBase = new Firebase (baseUrl + '/interestList/' + id);
    var data = $firebaseObject(interestFireBase);
    return data;
  };

 });
