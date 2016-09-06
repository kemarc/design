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

});
