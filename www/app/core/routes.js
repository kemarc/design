angular.module('full_starter.routes', [])
  .constant('Popup', {
    delay: 3000, //How long the popup message should show before disappearing (in milliseconds -> 3000 = 3 seconds).
    successIcon: "ion-happy-outline",
    errorIcon: "ion-sad-outline",
    accountCreateSuccess: "Congratulations! Your account has been created. Logging you in.",
    emailAlreadyExists: "Sorry, but an account with that email address already exists. Please register with a different email and try again.",
    accountAlreadyExists: "Sorry, but an account with the same credential already exists. Please check your account and try again.",
    emailNotFound: "Sorry, but we couldn\'t find an account with that email address. Please check your email and try again.",
    userNotFound: "Sorry, but we couldn\'t find a user with that account. Please check your account and try again.",
    invalidEmail: "Sorry, but you entered an invalid email. Please check your email and try again.",
    notAllowed: "Sorry, but registration is currently disabled. Please contact support and try again.",
    serviceDisabled: "Sorry, but logging in with this service is current disabled. Please contact support and try again.",
    wrongPassword: "Sorry, but the password you entered is incorrect. Please check your password and try again.",
    accountDisabled: "Sorry, but your account has been disabled. Please contact support and try again.",
    weakPassword: "Sorry, but you entered a weak password. Please enter a stronger password and try again.",
    errorRegister: "Sorry, but we encountered an error registering your account. Please try again later.",
    passwordReset: "A password reset link has been sent to: ",
    errorPasswordReset: "Sorry, but we encountered an error sending your password reset email. Please try again later.",
    errorLogout: "Sorry, but we encountered an error logging you out. Please try again later.",
    sessionExpired: "Sorry, but the login session has expired. Please try logging in again.",
    errorLogin: "Sorry, but we encountered an error logging you in. Please try again later.",
    welcomeBack: "Welcome back! It seems like you should still be logged in. Logging you in now.",
    manyRequests: "Sorry, but we\'re still proccessing your previous login. Please try again later."
  })

  .constant('Social', {
    googleWebClientId: "778952668094-pu4uhti4hi5m0g51ih0uiapvdu4mjj5i.apps.googleusercontent.com"
  })

  .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text("");
    $ionicConfigProvider.navBar.alignTitle("center");

    $stateProvider
      .state('tabs', {
        url: '/tabs',
        templateUrl: 'app/core/sidemenu.html',
        abstract: true,
        controller: 'settingsCtrl'
      })

      .state('tabs.news', {
        url: '/news',
        views: {
          'menuContent': {
            templateUrl: 'app/news/news.html',
            controller: 'newsCtrl'
          }
        }
      })

      .state('tabs.explore', {
        url: '/explore',
        views: {
          'menuContent': {
            templateUrl: 'app/news/explore.html',
            controller: 'exploreCtrl'
          }
        }
      })
      
      .state('tabs.account', {
        url: '/account',
        views: {
          'menuContent': {
            templateUrl: 'app/account/account.html',
            controller: 'profileCtrl'
          }
        }
      })

      .state('tabs.friend', {
        url: '/friend',
        views: {
          'menuContent': {
            templateUrl: 'app/account/friend.html',
            controller: 'friendCtrl'
          }
        }
      })

      .state('tabs.leader', {
        url: '/leader',
        views: {
          'menuContent': {
            templateUrl: 'app/account/leader.html',
            controller: 'leaderCtrl'
          }
        }
      })

      .state('tabs.post-detail', {
        url: '/post-detail',
        params: { post: null },
        views: {
          'menuContent': {
            templateUrl: 'app/news/post.html',
            controller: 'postCtrl'
          }
        }
      })

      .state('tabs.comments', {
        url: '/comments',
        params: { post: null },
        views: {
          'menuContent': {
            templateUrl: 'app/news/comments.html',
            controller: 'commentsCtrl'
          }
        }
      })
      .state('tabs.likes', {
        url: '/likes',
        params: { post: null },
        views: {
          'menuContent': {
            templateUrl: 'app/news/likes.html',
            controller: 'likesCtrl'
          }
        }
      })

      .state('tabs.commits', {
        url: '/commits',
        params: { post: null },
        views: {
          'menuContent': {
            templateUrl: 'app/news/commits.html',
            controller: 'commitsCtrl'
          }
        }
      })

      //Dashboard
      .state('tabs.plans', {
        url: '/plans',
        views: {
          'menuContent': {
            templateUrl: 'app/dashboard/plans.html',
            controller: 'plansCtrl'
          }
        }
      })

      .state('tabs.reminders', {
        url: '/reminders',
        views: {
          'menuContent': {
            templateUrl: 'app/dashboard/reminders.html',
            controller: 'remindersCtrl'
          }
        }
      })

      .state('create-edit-reminder', {
        url: '/create-edit-reminder',
        params: { reminder: null, type: null },
        templateUrl: 'app/dashboard/create-edit-reminder.html',
        controller: 'editReminderCtrl'
      })

      .state('create-edit-event', {
        url: '/create-edit-event',
        params: { reminder: null, type: null },
        templateUrl: 'app/dashboard/create-edit-event.html',
        controller: 'editEventCtrl'
      })

      .state('tabs.contacts', {
        url: '/contacts',
        views: {
          'menuContent': {
            templateUrl: 'app/dashboard/contacts.html',
            controller: 'contactsCtrl'
          }
        }
      })

      .state('tabs.cost', {
        url: '/cost',
        views: {
          'menuContent': {
            templateUrl: 'app/dashboard/cost.html',
            controller: 'costCtrl'
          }
        }
      })

      .state('tabs.commentList', {
        url: '/commentList',
        views: {
          'menuContent': {
            templateUrl: 'app/news/commentList.html',
            controller: 'commentListCtrl'
          }
        }
      })

      .state('tabs.commitList', {
        url: '/commitList',
        views: {
          'menuContent': {
            templateUrl: 'app/news/commitList.html',
            controller: 'commitListCtrl'
          }
        }
      })

      .state('tabs.likeList', {
        url: '/likeList',
        views: {
          'menuContent': {
            templateUrl: 'app/news/likeList.html',
            controller: 'likeListCtrl'
          }
        }
      })


      .state('tabs.match', {
        url: '/match',
        views: {
          'menuContent': {
            templateUrl: 'app/shop/match.html',
            controller: 'matchCtrl'
          }
        }
      })

      .state('tabs.coach', {
        url: '/coach',
        views: {
          'menuContent': {
            templateUrl: 'app/shop/coach.html',
            controller: 'coachCtrl'
          }
        }
      })

      .state('tabs.trainers', {
        url: '/trainers',
        views: {
          'menuContent': {
            templateUrl: 'app/dashboard/trainers.html',
            controller: 'trainersCtrl'
          }
        }
      })

      .state('tabs.thanks', {
        url: '/thanks',
        views: {
          'menuContent': {
            templateUrl: 'app/shop/thanks.html',
            controller: 'thanksCtrl'
          }
        }
      })


      .state('tabs.calendar', {
        url: '/calendar',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/calendar.html',
            controller: 'calendarCtrl'
          }
        }
      })

      .state('tabs.schedule', {
        url: '/schedule',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/schedule.html',
            controller: 'scheduleCtrl'
          }
        }
      })

      .state('tabs.rather', {
        url: '/rather',
        views: {
          'menuContent': {
            templateUrl: 'app/shop/rather.html',
            controller: 'ratherCtrl'
          }
        }
      })

      .state('tabs.notifications', {
        url: '/notifications',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/notifications.html',
            controller: 'notificationsCtrl'
          }
        }
      })

      .state('tabs.status', {
        url: '/status',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/status.html',
            controller: 'statusCtrl'
          }
        }
      })

      .state('tabs.partners', {
        url: '/partners',
        views: {
          'menuContent': {
            templateUrl: 'app/account/partners.html',
            controller: 'partnersCtrl'
          }
        }
      })

      .state('tabs.interest', {
        url: '/interest',
        views: {
          'menuContent': {
            templateUrl: 'app/shop/interest.html',
            controller: 'interestCtrl'
          }
        }
      })

      .state('tabs.edit-profile', {
        url: '/edit-profile',
        views: {
          'menuContent': {
            templateUrl: 'app/account/edit-profile.html',
            controller: 'editProfileCtrl'
          }
        }
      })

      .state('tabs.chat', {
        url: '/chat',
        params: { chat: null },
        views: {
          'menuContent': {
            templateUrl: 'app/chat/chat.html',
            controller: 'chatCtrl'
          }
        }
      })

      .state('tabs.conversations', {
        url: '/conversations',
        views: {
          'menuContent': {
            templateUrl: 'app/chat/conversations.html',
            controller: 'conversationsCtrl'
          }
        }
      })

      .state('tabs.sentPlans', {
        url: '/sentPlans',
        views: {
          'menuContent': {
            templateUrl: 'app/chat/sentPlans.html',
            controller: 'sentPlansCtrl'
          }
        }
      })

      .state('tabs.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/settings.html',
            controller: 'settingsCtrl'
          }
        }
      })

      .state('tabs.signup', {
        url: '/signup',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/signup.html',
            controller: 'signupCtrl'
          }
        }
      })
      .state('authentication', {
        url: '/authentication',
        templateUrl: 'app/intro/authentication.html',
        controller: 'loginCtrl',
      })

    $urlRouterProvider.otherwise('/authentication')



  })

  .config(function ($ionicConfigProvider, calendarConfig) {


    calendarConfig.titleFormats.week = 'MMMM';
    calendarConfig.dateFormatter = 'moment';
    calendarConfig.allDateFormats.moment.date.hour = 'h:mm a';
    calendarConfig.allDateFormats.moment.title.day = 'MMM D ddd';
    calendarConfig.i18nStrings.weekNumber = 'Week {week}';
    calendarConfig.dateFormats.weekDay = 'ddd';
    calendarConfig.dateFormats.day = 'D';
    calendarConfig.displayAllMonthEvents = true;
    calendarConfig.displayEventEndTimes = true;
  })
