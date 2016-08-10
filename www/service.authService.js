var config = {
        apiKey: "AIzaSyAi3MSQwVNEamaHBt9FoIluT9KVXpI6HV8",
        authDomain: "trained-to-glory.firebaseapp.com",
        databaseURL: "https://trained-to-glory.firebaseio.com",
        storageBucket: "trained-to-glory.appspot.com",
      };

 var mainApp = firebase.initializeApp(config);

 var provider = new firebase.auth.GoogleAuthProvider();
 	function googleSignIn() {
      if (!firebase.auth().currentUser) {

        provider.addScope('https://www.googleapis.com/auth/plus.login');

        firebase.auth().signInWithPopup(provider)
        .then(function(result){ 
        	console.log(result);
        },function(error){
        	console.log('error');
        });

    };
};

	function googleSignOut(){

		firebase.auth().signOut();
	};

