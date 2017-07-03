/**
 * Created by Administrator on 2017.06.30 0030.
 */
var appController = angular.module('starter.controllers');

//用户控制器
appController.controller('UserCtrl', function ($scope, $rootScope, $state, $cordovaProgress, md5Utils) {
  // 隐藏返回按钮
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });

  // $rootScope.badges = {num: 3};

  $scope.user = {
    phone: null,
    password: null
  };

  function randomString(len) {
    len = len || 32;
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

  //定义JMessage对象
  var JIM = new JMessage({debug: false});

  var across_user = 'test';
  var across_appkey = '7631e37796951e88082536d5';
  var secret = '6b4f28a3c3d86e09a674bf43';
  var target_nickname = 'test001';
  var gid = 22314375;
  var target_gname = 'xu_test'
  var random_str = randomString(32);
  var timestamp = Date.now();
  var signature = md5Utils.md5('appkey=' + across_appkey + '&timestamp=' + timestamp + '&random_str=' + random_str + '&key=' + secret);

  //测试JMessage
  function testJmessage() {

    //初始化
    JIM.init({
      "appkey": across_appkey,
      "random_str": random_str,
      "signature": signature,
      "timestamp": timestamp,
      "flag": "0"
    }).onSuccess(function (data) {
      console.log('init success');
      console.log(data);
      //data.code 返回码
      //data.message 描述

      // JIM.register({
      //   'username': $scope.user.phone,
      //   'password': $scope.user.password,
      //   'is_md5': '<is_md5>'
      // }).onSuccess(function (data) {
      //   console.log('register success');
      //   console.log(data);
      //   //data.code 返回码
      //   //data.message 描述
      // }).onFail(function (data) {
      //   console.log('register fail');
      //   console.log(data);
      // });

      //登录
      JIM.login({
        'username': $scope.user.phone,
        'password': $scope.user.password
      }).onSuccess(function (data) {
        console.log('login success');
        console.log(data);

        //在线消息监听
        JIM.onMsgReceive(function (data) {
          console.log(data);
          console.log('receive msg: ' + JSON.stringify(data));
        });

        //获取会话列表
        JIM.getConversation().onSuccess(function (data) {
          console.log('getConversation success');
          console.log(data);
          //data.code 返回码
          //data.message 描述
          //data.conversations[] 会话列表，属性如下示例
          //data.conversations[0].name  会话名称
          //data.conversations[0].nickname  用户昵称(单聊)
          //data.conversations[0].avatar  用户头像 id (单聊)
          //data.conversations[0].type  会话类型(3 代表单聊会话类型，4 代表群聊会话类型)
          //data.conversations[0].key会话对象唯一标识(单聊用户唯一标识，群聊群组 gid)
        }).onFail(function (data) {
          console.log('getConversation fail');
          console.log(data);
          //data.code 返回码
          //data.message 描述
        });

        // JIM.getUserInfo({
        //   'username' : 'test',
        //   'appkey' : appkey
        // }).onSuccess(function(data) {
        //   console.log('getUserInfo success');
        //   console.log(data);
        //   //data.code 返回码
        //   //data.message 描述
        //   //data.user_info.username
        //   //data.user_info.appkey
        //   //data.user_info.nickname
        //   //data.user_info.avatar 头像
        //   //data.user_info.birthday 生日，默认空
        //   //data.user_info.gender 性别 0 - 未知， 1 - 男 ，2 - 女
        //   //data.user_info.signature 用户签名
        //   //data.user_info.region 用户所属地区
        //   //data.user_info.address 用户地址
        //   //data.user_info.mtime 用户信息最后修改时间
        // }).onFail(function(data) {
        //   console.log('getUserInfo fail');
        //   console.log(data);
        //   //data.code 返回码
        //   //data.message 描述
        // });

        //业务事件监听
        JIM.onEventNotification(function (data) {
          console.log('event_receive: ' + JSON.stringify(data));
        });

        //离线消息同步监听
        JIM.onSyncConversation(function (data) {
          console.log('event_receive: ' + data);
        });

        //用户信息修改监听
        JIM.onUserInfUpdate(function (data) {
          console.log('onUserInfUpdate : ' + JSON.stringify(data));
        });

        //data.code 返回码
        //data.message 描述
      }).onFail(function (data) {
        console.log('login fail');
        console.log(data);
      });

    }).onFail(function (data) {
      console.log('init fail');
      console.log(data);
    });
  }

  //获取个人信息
  function getSelfInfo() {
    JIM.getUserInfo({
      'username': 'test'
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });

  }

  //获取头像或文件资源
  function getResource() {
    JIM.getResource({'media_id': 'qiniu/image/j/9091C8D651258AC538FB5E033041EE15'}).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (da) {
      console.log('success:' + JSON.stringify(data));
    });
  }

  //发送信息
  function sendSingleMsg() {
    JIM.sendSingleMsg({
      'target_username': 'test',
      'content': '12221',
      'appkey': appkey,
      'no_offline': false,
      'no_notification': false
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function createGroup() {
    JIM.createGroup({
      'group_name': 'new_group',
      'group_description': 'Hi, JiGuang'
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function getGroups() {
    JIM.getGroups().onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function updateGroupInfo() {
    JIM.updateGroupInfo({
      'group_name': 'xu_test',
      'group_description': 'Hi, JiGuang',
      'gid': gid
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }


  function addGroupShield() {
    JIM.addGroupShield({'gid': gid}).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function delGroupShield() {
    JIM.delGroupShield({'gid': gid}).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function getGroupInfo() {
    JIM.getGroupInfo({'gid': gid}).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function exitGroup() {
    JIM.exitGroup({'gid': gid}).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data))
    });
  }

  function getGroupMembers() {
    JIM.getGroupMembers({'gid': gid}).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function addGroupMembers() {
    JIM.addGroupMembers({
      'gid': gid,
      'member_usernames': [{'username': across_user, 'appkey': across_appkey}]
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data))
    });
  }

  function delGroupMembers() {
    JIM.delGroupMembers({
      'gid': gid,
      'member_usernames': [{'username': across_user, 'appkey': across_appkey}]
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function sendGroupMsg() {
    JIM.sendGroupMsg({
      'target_gid': gid,

      'content': 'haha',
      'at_list': [{'username': across_user, 'appkey': across_appkey}]
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function sendGroupCustom() {
    JIM.sendGroupCustom({
      'target_gid': gid,
      'target_gname': target_gname,
      'custom': {'k1': 'v1', 'k2': 'v2'}
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }


  function sendSingleCustom() {
    JIM.sendSingleCustom({
      'target_username': across_user,
      'target_nickname': target_nickname,
      'custom': {'k1': 'v1', 'k2': 'v2'},
      'appkey': across_appkey
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function sendAcrossSingleMsg() {
    JIM.sendSingleMsg({
      'target_username': across_user,
      'target_nickname': target_nickname,
      'content': 'Hi, JiGuang',
      'appkey': across_appkey
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }


  function sendSinglePic() {
    JIM.sendSinglePic({
      'target_username': across_user,
      'target_nickname': target_nickname,
      'appkey': across_appkey,
      'image': getFile()
    }).onSuccess(function (data, msg) {
      console.log('success:' + JSON.stringify(data));
      console.log('send: ' + JSON.stringify(msg));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function sendGroupPic() {
    JIM.sendGroupPic({
      'target_gid': gid,
      'target_gname': target_gname,
      'image': getFile()
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function sendSingleFile() {
    JIM.sendSingleFile({
      'file': getFile(),
      'target_username': across_user,
      'target_nickname': target_nickname,
      'appkey': across_appkey,
      'extras': {'key': 'val', 'key2': 'val2'}
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function sendGroupFile() {
    JIM.sendGroupFile({
      'target_gid': gid,
      'target_gname': target_gname,
      'file': getFile()
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function sendSingleLocation() {
    JIM.sendSingleLocation({
      'target_username': across_user,
      'target_nickname': target_nickname,
      'appkey': across_appkey,
      'latitude': 38.6577668476,
      'longitude': 104.0829574963,
      'scale': 1,
      'label': '广东省深圳市南山区'
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function sendGroupLocation() {
    JIM.sendGroupLocation({
      'target_gid': gid,
      'latitude': 38.6577668476,
      'longitude': 104.0829574963,
      'scale': 1,
      'label': '广东省深圳市南山区'
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }


  function getConversation() {
    JIM.getConversation().onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  //免打扰管理
  function noDisturb() {
    JIM.getNoDisturb().onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  //添加个人免打扰
  function addSingleDisturb() {
    JIM.addSingleNoDisturb({'appkey': across_appkey, 'target_name': across_user}).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  //移除个人免打扰
  function delSingleDisturb() {
    JIM.delSingleNoDisturb({'appkey': across_appkey, 'target_name': across_user}).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function addGroupDisturb() {
    JIM.addGroupNoDisturb({'gid': gid}).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function delGroupDisturb() {
    JIM.delGroupNoDisturb({'gid': gid}).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  //全局免打扰
  function addGlobalDisturb() {
    JIM.addGlobalNoDisturb().onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function delGlobalDisturb() {
    JIM.delGlobalNoDisturb().onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  //获取黑名单列表
  function getBlackList() {
    JIM.getBlacks().onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  //添加黑名单
  function addBlack() {
    JIM.addSingleBlacks({
      'member_usernames': [{
        'username': across_user,
        'appkey': across_appkey
      }]
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  //删除黑名单
  function delBlack() {
    JIM.delSingleBlacks({
      'member_usernames': [{
        'username': across_user,
        'appkey': across_appkey
      }]
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }


  function updateUserInfo() {
    JIM.updateSelfInfo({'nickname': 'xuqijin_nick_name', 'address': '深圳'}).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function updateUserPic() {
    JIM.updateSelfAvatar({'avatar': getFile()}).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }


  function updateUserPwd() {
    JIM.updateSelfPwd({'old_pwd': '123456', 'new_pwd': '123456', 'is_md5': false}).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function getFriendList() {
    JIM.getFriendList().onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function addFriend() {
    JIM.addFriend({
      'appkey': across_appkey,
      'target_name': across_user,
      'from_type': '1',
      'why': 'hi,friend'
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function updateFriendMemo() {
    JIM.updateFriendMemo({
      'appkey': across_appkey,
      'target_name': across_user,
      'memo_name': 'test_memo_update',
      'memo_others': 'test_others_update_yaya'
    }).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function delFriend() {
    JIM.delFriend({'appkey': across_appkey, 'target_name': across_user}).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function msgRetract(msg_id) {
    JIM.msgRetract({"msg_id": msg_id}).onSuccess(function (data) {
      console.log('success:' + JSON.stringify(data));
    }).onFail(function (data) {
      console.log('error:' + JSON.stringify(data));
    });
  }

  function isConnect() {
    console.log('isConnect:' + JIM.isConnect());
  }

  function isInit() {
    console.log('isInit:' + JIM.isInit());
  }

  function isLogin() {
    console.log('isLogin:' + JIM.isLogin());
  }

  $scope.userLogin = function () {
    if (!Boolean($scope.user.phone)) {
      console.log('用户名不能为空');
      return;
    }
    if (!Boolean($scope.user.password)) {
      console.log('密码不能为空');
      return;
    }
    // $cordovaProgress.showAnnular(true, 5000);
    //testJmessage();
    $state.go('tab.dash');
  };
});
