angular.module('full_starter.routes', [])

  .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text("");
    $ionicConfigProvider.navBar.alignTitle("center");

    $stateProvider
      .state('tabs', {
        url: '/tabs',
        templateUrl: 'app/core/sidemenu.html',
        abstract: true
      })

      .state('tabs.news', {
        url: '/news',
        views: {
          'menuContent': {
            templateUrl: 'app/news/news.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.explore', {
        url: '/explore',
        views: {
          'menuContent': {
            templateUrl: 'app/news/explore.html',
            controller: 'appCtrl'
          }
        }
      })


      .state('tabs.account', {
        url: '/account',
        views: {
          'menuContent': {
            templateUrl: 'app/account/account.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.friend', {
        url: '/friend',
        views: {
          'menuContent': {
            templateUrl: 'app/account/friend.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.leader', {
        url: '/leader',
        views: {
          'menuContent': {
            templateUrl: 'app/account/leader.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.post-detail', {
        url: '/post-detail',
        params: { post: null },
        views: {
          'menuContent': {
            templateUrl: 'app/news/post.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.comments', {
        url: '/comments',
        params: { post: null },
        views: {
          'menuContent': {
            templateUrl: 'app/news/comments.html',
            controller: 'appCtrl'
          }
        }
      })
      .state('tabs.likes', {
        url: '/likes',
        params: { post: null },
        views: {
          'menuContent': {
            templateUrl: 'app/news/likes.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.commits', {
        url: '/commits',
        params: { post: null },
        views: {
          'menuContent': {
            templateUrl: 'app/news/commits.html',
            controller: 'appCtrl'
          }
        }
      })

      //Dashboard
      .state('tabs.plans', {
        url: '/plans',
        views: {
          'menuContent': {
            templateUrl: 'app/dashboard/plans.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.reminders', {
        url: '/reminders',
        views: {
          'menuContent': {
            templateUrl: 'app/dashboard/reminders.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('create-edit-reminder', {
        url: '/create-edit-reminder',
        params: { reminder: null, type: null },
        templateUrl: 'app/dashboard/create-edit-reminder.html',
        controller: 'appCtrl'
      })

      .state('tabs.contacts', {
        url: '/contacts',
        views: {
          'menuContent': {
            templateUrl: 'app/dashboard/contacts.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.cost', {
        url: '/cost',
        views: {
          'menuContent': {
            templateUrl: 'app/dashboard/cost.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.commentList', {
        url: '/commentList',
        views: {
          'menuContent': {
            templateUrl: 'app/news/commentList.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.commitList', {
        url: '/commitList',
        views: {
          'menuContent': {
            templateUrl: 'app/news/commitList.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.likeList', {
        url: '/likeList',
        views: {
          'menuContent': {
            templateUrl: 'app/news/likeList.html',
            controller: 'appCtrl'
          }
        }
      })


      .state('tabs.match', {
        url: '/match',
        views: {
          'menuContent': {
            templateUrl: 'app/shop/match.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.coach', {
        url: '/coach',
        views: {
          'menuContent': {
            templateUrl: 'app/shop/coach.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.trainers', {
        url: '/trainers',
        views: {
          'menuContent': {
            templateUrl: 'app/dashboard/trainers.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.checkout', {
        url: '/checkout',
        views: {
          'menuContent': {
            templateUrl: 'app/shop/checkout.html',
            controller: 'appCtrl'
          }
        }
      })
      .state('tabs.thanks', {
        url: '/thanks',
        views: {
          'menuContent': {
            templateUrl: 'app/shop/thanks.html',
            controller: 'appCtrl'
          }
        }
      })


      .state('tabs.calendar', {
        url: '/calendar',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/calendar.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.schedule', {
        url: '/schedule',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/schedule.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.rather', {
        url: '/rather',
        views: {
          'menuContent': {
            templateUrl: 'app/shop/rather.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.notifications', {
        url: '/notifications',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/notifications.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.status', {
        url: '/status',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/status.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.partners', {
        url: '/partners',
        views: {
          'menuContent': {
            templateUrl: 'app/account/partners.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.interest', {
        url: '/interest',
        views: {
          'menuContent': {
            templateUrl: 'app/shop/interest.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.edit-profile', {
        url: '/edit-profile',
        views: {
          'menuContent': {
            templateUrl: 'app/account/edit-profile.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.chat', {
        url: '/chat',
        params: { chat: null },
        views: {
          'menuContent': {
            templateUrl: 'app/chat/chat.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.conversations', {
        url: '/conversations',
        views: {
          'menuContent': {
            templateUrl: 'app/chat/conversations.html',
            controller: 'appCtrl'
          }
        }
      })
      
      .state('tabs.sentPlans', {
        url: '/sentPlans',
        views: {
          'menuContent': {
            templateUrl: 'app/chat/sentPlans.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('tabs.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/settings.html',
            controller: 'appCtrl'
          }
        }
      })
      .state('tabs.cards', {
        url: '/cards',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/cards.html',
            controller: 'appCtrl'
          }
        }
      })
      .state('tabs.animate', {
        url: '/animate',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/animate.html',
            controller: 'appCtrl'
          }
        }
      })
      .state('tabs.components', {
        url: '/forms',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/components.html',
            controller: 'appCtrl'
          }
        }
      })
      .state('tabs.signup', {
        url: '/signup',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/signup.html',
            controller: 'appCtrl'
          }
        }
      })
      .state('authentication', {
        url: '/authentication',
        templateUrl: 'app/intro/authentication.html',
        controller: 'appCtrl',
      })

    $urlRouterProvider.otherwise('/authentication')



  })

  .config(function ($ionicConfigProvider, calendarConfig, ChartJsProvider) {

    // $ionicConfigProvider.tabs.style('standard').position('top');
    // $ionicConfigProvider.navBar.alignTitle('center');

    ChartJsProvider.setOptions({ colours: ['#26a69a', '#29b6f6', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });

    calendarConfig.titleFormats.week = 'MMMM';
    calendarConfig.dateFormatter = 'moment';
    calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';
    calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM';
    calendarConfig.i18nStrings.weekNumber = 'Week {week}';
    calendarConfig.dateFormats.weekDay = 'ddd';
    calendarConfig.dateFormats.day = 'D';
    calendarConfig.displayAllMonthEvents = true;
    calendarConfig.displayEventEndTimes = true;
  })

//Uncomment to add styling to sliding box page buttons
  // .config(function ($provide) {
  //           $provide.decorator('ionPagerDirective', function ($delegate) {
  //               var directive = $delegate[0];
  //               var template = directive.template;
  //               directive.template = '<div class="slider-pager"><span class="slider-pager-page" ng-repeat="slide in numSlides() track by $index" ng-class="{active: $index == currentSlide}" ng-click="pagerClick($index)"><i class="icon ion-record" ng-show="$index !== currentSlide"></i><img class="slider-pager-img" src="img/dot_active.png" ng-show="$index == currentSlide"/></span></div>';


  //               return $delegate;
  //           });
  //       })