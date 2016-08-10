angular.module('service.auth', [])
 .service('authService', function(){

    var config = {
        apiKey: "AIzaSyAi3MSQwVNEamaHBt9FoIluT9KVXpI6HV8",
        authDomain: "trained-to-glory.firebaseapp.com",
        databaseURL: "https://trained-to-glory.firebaseio.com",
        storageBucket: "trained-to-glory.appspot.com",
      };

    var mainApp = firebase.initializeApp(config);

    var provider = new firebase.auth.GoogleAuthProvider();
    
     this.googleSignIn = function() {
      if (!firebase.auth().currentUser) {
        provider.addScope('https://www.googleapis.com/auth/plus.login');

        console.log("googleSignIn: not signed in");
        firebase.auth().signInWithPopup(provider)
        .then(function(result){ 
            console.log(result);
        },function(error){
            console.log('error');
        });
        return;
     }
        console.log('googleSignIn: signed in');
    };

     this.googleSignOut = function(){
        console.log('googleSignOut');
        return firebase.auth().signOut();
    };

    this.googleAuth = function(){
        return firebase.auth();
    }

});
