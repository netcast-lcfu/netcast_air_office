//预先加载Controller Services Utils模块
angular.module('starter.services', []);
angular.module('starter.controllers', []);
angular.module("starter.utils", []);

var app = angular.module('starter', ['ionic', 'starter.services', 'starter.controllers','starter.utils']);

//定义常量
app.constant("ApiEndpoint", {
  //url: 'http://211.141.224.40:8070/mas_analysis',
  // url: 'http://192.252.100.20:8070/mas_analysis',
  url: 'http://10.1.1.86:8080/mas_analysis',
  //访问超时时间10s
  timeout: 10000
});

app.run(function ($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {
    if (toState.name == 'tab.chat-detail') {
      $rootScope.hideTabs=true;
    } else {
      $rootScope.hideTabs=false;
    }
  });

});

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

  //全局禁用view缓存 及时刷新数据
  // $ionicConfigProvider.views.maxCache(0);

  //导航栏标题居中
  $ionicConfigProvider.navBar.alignTitle('center');

  // Android 将tab位置移到底部
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.tabs.style('');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/user/login.html',
      controller: 'UserCtrl'
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('tab.statistics', {
      url: '/statistics',
      views: {
        'tab-statistics': {
          templateUrl: 'templates/tab-statistics.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.contact', {
      url: '/contact',
      views: {
        'tab-contact': {
          templateUrl: 'templates/tab-contact.html',
          controller: 'ContactCtrl'
        }
      }
    })
    .state('tab.more', {
      url: '/more',
      views: {
        'tab-more': {
          templateUrl: 'templates/tab-more.html',
          controller: 'MoreCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');


});
