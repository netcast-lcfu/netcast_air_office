/**
 * Created by Administrator on 2017.06.30 0030.
 */
var appController = angular.module('starter.controllers');

//聊天控制器
appController.controller('ChatsCtrl', function ($scope, Chats,SysMessages) {

  $scope.chats = Chats.all();

  $scope.remove = function (chat) {
    Chats.remove(chat);
  };

  $scope.isRead = function (chatId) {
    var chat = Chats.get(chatId);
    if(chat){
      chat.unreadMessageCount = '0';
    }
  };

  $scope.sysmessages = SysMessages.all();

  $scope.removeSysMsg = function (msg) {
    SysMessages.remove(msg);
  };

});

//指令为发送的input提供方法绑定
appController.directive('input', function ($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function (scope, element, attr) {
      element.bind('focus', function (e) {
        if (scope.onFocus) {
          $timeout(function () {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function (e) {
        if (scope.onBlur) {
          $timeout(function () {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function (e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function () {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
});

//聊天详情
appController.controller('ChatDetailCtrl', function ($scope, $stateParams, $timeout, $ionicScrollDelegate, Chats) {

  //隐藏tab
  // $scope.$on('$ionicView.afterEnter', function () {
  //   var tabs = document.getElementsByTagName('ion-tabs');
  //   angular.element(tabs).addClass("tabs-item-hide");
  // });
  // $scope.$on('$ionicView.beforeLeave', function () {
  //   var tabs = document.getElementsByTagName('ion-tabs');
  //   angular.element(tabs).removeClass("tabs-item-hide");
  // });

  $scope.doRefresh = function () {
    console.log('refresh success');
    //通知前台视图刷新完成
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.isUser = function (chatId) {
    if (chatId == userId) {
      return true;
    } else {
      return false;
    }
  };

  var userId = '123456';
  $scope.messages = [{
    userId: '891231',
    name: 'Ben',
    avatar: './img/avatar/ben.png',
    content: 'Hello',
    time: new Date().getTime()
  }, {
    userId: userId,
    name: 'Mike',
    avatar: './img/avatar/mike.png',
    content: 'Hi',
    time: new Date().getTime()
  }, {
    userId: '891231',
    name: 'Ben',
    avatar: './img/avatar/ben.png',
    content: 'How are you?',
    time: new Date().getTime()
  }, {
    userId: userId,
    name: 'Mike',
    avatar: './img/avatar/mike.png',
    content: 'I am fine,thanks.',
    time: new Date().getTime()
  }];

  Date.prototype.Format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  };

  $scope.hideTime = true;

  var alternate = true, isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendMessage = function () {
    if (!Boolean($scope.data.message)) {
      return;
    }
    alternate = !alternate;

    $scope.messages.push({
      userId: alternate ? userId : '891231',
      name: alternate ? 'Mike' : 'Ben',
      avatar: alternate ? './img/mike.png' : './img/ben.png',
      content: $scope.data.message,
      time: new Date().Format("hh:mm:ss")
    });

    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);

  };


  $scope.inputUp = function () {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function () {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function () {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function () {
    // cordova.plugins.Keyboard.close();
  };

  $scope.chat = Chats.get($stateParams.chatId);
});

