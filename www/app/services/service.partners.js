angular.module('service.partners', [])
 .service('partnersService', function(){
       return {
                    getContacts: function () {
                        return _contacts;
                    }
                
                }
});


  var _contacts = [
    {
        id: 3,
        "name": "Thomas Tank",
        "photo": "img/users/3.jpg",
        "desc": " Astronault"
    }, {
        "id": 4,
        "name": "Steven Spruse",
        "photo": "img/users/4.jpg",
        "desc": " Professor"
    },
    {
        id: 2,
        "name": "Rupert Bear",
        "photo": "img/users/2.jpg",
        "desc": " Software Developer"
    },
    {
        id: 5,
        "name": "Diana Cahill",
        "photo": "img/users/5.jpg",
        "desc": " Doctor"
    },
    {
        id: 6,
        "name": "Samuel Ross",
        "photo": "img/users/3.jpg",
        "desc": "Archeologist"
    },
    {
        "id": 7,
        "name": "Daily Bugle",
        "photo": "img/users/4.jpg",
        "desc": "News Reporter"
    },
    {
        "id": 8,
        "name": "Peter Vaughn",
        "photo": "img/users/2.jpg",
        "desc": "Chef"
    }
]