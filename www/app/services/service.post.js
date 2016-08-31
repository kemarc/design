angular.module('service.post', [])
    .service('postService', function ($localStorage, $timeout) {

        this.get = function (postId) {
            var posts = (postId) ? firebase.database().ref('posts/' + postId) : firebase.database().ref('posts');
            return posts.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    return currentObj;
                }
                return undefined;
            });
        };

        this.create = function (postTypeId, userId, activityId, description, filePath) {
            //create a location in the table
            var obj = {
                "typeId": postTypeId || '',
                "activityId": activityId || '',
                "description": description || '',
                "filePath": filePath || '',
                "created": firebase.database.ServerValue.TIMESTAMP,
                "createdBy": userId || ''
            };
            var db = firebase.database().ref();
            var posts = db.child('posts');
            var postsKey = posts.push(obj).key;

            return postsKey;
        };

        this.update = function (postId, postTypeId, userId, activityId, description, filePath, created, createdBy) {
            var posts = firebase.database().ref('posts/' + postId);
            return posts.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    var obj = {
                        "typeId": postTypeId ? postTypeId : currentObj.typeId,
                        "activityId": activityId ? activityId : currentObj.activityId,
                        "description": description ? description : currentObj.description,
                        "filePath": filePath ? filePath : currentObj.filePath,
                        "created": created ? created : currentObj.created,
                        "lastModified": firebase.database.ServerValue.TIMESTAMP,
                        "createdBy": createdBy ? createdBy : currentObj.createdBy
                    };
                    return posts.update(obj);
                }
                return null;
            });
        };

        this.delete = function (postId) {
            var posts = firebase.database().ref('posts/' + postId);
            return posts.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    return posts.remove();
                }
                return null;
            });
        };

        this.getNews = function () {
            return _news;
        };

        this.getRandomObject = function (arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        };

        this.showAlert = function (title, text, buttonText, buttonType, page) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: text,
                buttons: [{ text: buttonText, type: buttonType }]
            });
            $timeout(function () {
                alertPopup.close();
            })
        };
    });

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


//Contacts data
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

// data for news tab
var _news = [
    {
        "id": 8,
        "title": "The hysterical laugh determines the control.",
        "link": "",
        "author": "Peter Vaughn",
        "source": "",
        "sourceLogo": "img/users/1.jpg",
        "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
        "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi",
        "image": "img/images/1.jpg",
        "likes": [
            {
                "name": "Thomas Tank",
                "photo": "img/users/2.jpg"
            },
            {
                "name": "Rupert Bear",
                "photo": "img/users/3.jpg"
            },
            {
                "name": "Diana Cahill",
                "photo": "img/users/4.jpg"
            },
            {
                "name": "Samuel Ross",
                "photo": "img/users/5.jpg"
            },
        ],
        "commits": [
            {
                "name": "Thomas Tank",
                "photo": "img/users/2.jpg"
            },
            {
                "name": "Rupert Bear",
                "photo": "img/users/3.jpg"
            },
            {
                "name": "Diana Cahill",
                "photo": "img/users/4.jpg"
            },
            {
                "name": "Samuel Ross",
                "photo": "img/users/5.jpg"
            },
        ]
    },
    {
        "id": 2,
        "title": "The decisive group obtains the steel.",
        "link": "",
        "author": "Rupert Bear",
        "source": "Daily Times",
        "sourceLogo": "img/users/2.jpg",
        "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
        "summary": "Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.",
        "image": "img/images/2.jpg",
        "comments": [
            {
                "name": "Rupert Bear",
                "photo": "img/users/2.jpg",
                "text": "The sugar relateds the gold.",
                "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
            },
            {
                "name": "Diana Cahill",
                "photo": "img/users/5.jpg",
                "text": "The sweltering system experiments the shade.",
                "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
            },
            {
                "name": "Samuel Ross",
                "photo": "img/users/3.jpg",
                "text": "The cute connection records the learning.",
                "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
            },
        ]
    },
    {
        "id": 3,
        "title": "The abandoned number commences the invention.",
        "link": "",
        "author": "Thomas Tank",
        "source": "Evening Standard",
        "sourceLogo": "img/users/2.jpg",
        "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
        "summary": "Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        "image": "img/images/3.jpg",
        "likes": [
            {
                "name": "Rupert Bear",
                "photo": "img/users/3.jpg"
            },
            {
                "name": "Diana Cahill",
                "photo": "img/users/4.jpg"
            },
            {
                "name": "Samuel Ross",
                "photo": "img/users/5.jpg"
            },
        ],

        "commits": [
            {
                "name": "Rupert Bear",
                "photo": "img/users/3.jpg"
            },
            {
                "name": "Diana Cahill",
                "photo": "img/users/4.jpg"
            },
            {
                "name": "Samuel Ross",
                "photo": "img/users/5.jpg"
            },
        ],
    },
    {
        "id": 4,
        "title": "The pull articulates the limit.",
        "link": "",
        "author": "Steven Spruse",
        "source": "Business News",
        "sourceLogo": "img/users/4.jpg",
        "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
        "summary": "Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices.",
        "image": "img/images/4.jpg",
        "comments": [
            {
                "name": "Thomas Tank",
                "photo": "img/users/2.jpg",
                "text": "The true guide demonstrates the protest.",
                "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
            },
            {
                "name": "Rupert Bear",
                "photo": "img/users/3.jpg",
                "text": "The act filters the idea.",
                "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
            },
            {
                "name": "Samuel Ross",
                "photo": "img/users/4.jpg",
                "text": "The loud industry contracts the fight.",
                "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
            },
        ]
    },
    {
        "id": 5,
        "title": "The heat builts the exchange.",
        "link": "",
        "author": "Diana Cahill",
        "source": "Forbes",
        "sourceLogo": "img/users/4.jpg",
        "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
        "summary": "Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam",
        "image": "img/images/5.jpg",
        "likes": [
            {
                "name": "Thomas Tank",
                "photo": "img/users/2.jpg"
            },
            {
                "name": "Rupert Bear",
                "photo": "img/users/1.jpg"
            },
            {
                "name": "Samuel Ross",
                "photo": "img/users/3.jpg"
            },
        ],
        "commits": [
            {
                "name": "Rupert Bear",
                "photo": "img/users/3.jpg"
            },
            {
                "name": "Diana Cahill",
                "photo": "img/users/4.jpg"
            },
            {
                "name": "Samuel Ross",
                "photo": "img/users/5.jpg"
            },
        ],
        "comments": [
            {
                "name": "Thomas Tank",
                "photo": "img/users/3.jpg",
                "text": "The jolly destruction gauges the canvas.",
                "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
            },
            {
                "name": "Rupert Bear",
                "photo": "img/users/2.jpg",
                "text": "The doubt enters the mere size.",
                "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
            },
            {
                "name": "Samuel Ross",
                "photo": "img/users/5.jpg",
                "text": "The loud industry contracts the fight.",
                "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
            },
        ]
    },
    {
        "id": 6,
        "title": "The memory attends the vengeful company.",
        "link": "",
        "author": "Samuel Ross",
        "source": "Daily Planet",
        "sourceLogo": "img/users/4.jpg",
        "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
        "summary": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue.",
        "image": "img/images/6.jpg"
    },
    {
        "id": 7,
        "title": "The top strategizes the proud part.",
        "link": "",
        "author": "Hazel Bradley",
        "source": "Daily Bugle",
        "sourceLogo": "img/users/5.jpg",
        "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
        "summary": "Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi.",
        "image": "img/images/7.jpg",
        "likes": [
            {
                "name": "Thomas Tank",
                "photo": "img/users/3.jpg",
            },
            {
                "name": "Rupert Bear",
                "photo": "img/users/2.jpg"
            },
            {
                "name": "Samuel Ross",
                "photo": "img/users/1.jpg"
            },
        ],
        "commits": [
            {
                "name": "Rupert Bear",
                "photo": "img/users/3.jpg"
            },
            {
                "name": "Diana Cahill",
                "photo": "img/users/4.jpg"
            },
            {
                "name": "Samuel Ross",
                "photo": "img/users/5.jpg"
            },
        ],
        "comments": [
            {
                "name": "Thomas Tank",
                "photo": "img/users/2.jpg",
                "text": "The gaping fold submits the stage.",
                "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
            },
            {
                "name": "Rupert Bear",
                "photo": "img/users/1.jpg",
                "text": "The fat curve adjusts the butter.",
                "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
            },
            {
                "name": "Samuel Ross",
                "photo": "img/users/3.jpg",
                "text": "The attraction augments the spiffy memory.",
                "publishedDate": randomDate(new Date(2016, 1, 1), new Date()),
            },
        ]
    }
];


// Random Messages used as replies for chat tab
var _randMessages = [
    'Over the propaganda tangent refrains the cryptic warehouse.',
    'Does a steam jacket your altered blade?',
    'The thirst gasps underneath the library.',
    'An era reverts?',
    'The blackmail zooms in the master!',
    'When can the horror arrest the new drama?',
    'Whatever elitist prizes a lemon.',
    'A workload stretches against the ridden suicide.',
    'The male dances beneath the conscience!',
    'Why wont the surplus joke?',
    'How can the capitalist bolt a coming terminology?',
    'Can the curve bolt near the optimal word?',
    'A ridiculous custom refutes a science.',
    'The cheese advances within a creep!',
    'The remembered indent rocks the depressed eye.',
    'A rhetorical library twists on top of a misuse.',
    'The rear flood bulls a hand underneath the post axiom.',
    'This rotating chord deserves the guard.',
    'Should the spoiled thief bay with the illiterate?'
]




