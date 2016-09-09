angular.module('service.userInterest', [])
 .service('userInterestService', function(){
   this.createInterestList = function(userId){
	    var data = {
	           "displayName": "Baseball",
	    };

	    var ref = firebase.database().ref('userInterest');

	    var key;

	    var interests = ['Baseball', 'Boxing','Basketball','Climbing','Cycling','Dance','Football','Golf','Jumping',
	              'Paintball','Pool','Skate','Soccer','Tennis','Weight Lifting', 'Yoga'];
	    for(var i = 0; i < interests.length; i++){
	      data = {
	           "displayName": interests[i],
             "interests": [
               '-KRGM6aHQdsXNqMa-28d'
             ],
	      };
	      key = ref.push().key;
	      ref.child(key).update(data);
    }
	    return;
	  };

});
