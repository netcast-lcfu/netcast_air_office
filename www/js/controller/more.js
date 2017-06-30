/**
 * Created by Administrator on 2017.06.30 0030.
 */
var appController = angular.module('starter.controllers');

appController.controller('MoreCtrl', function ($scope, $state, $ionicPopup) {

  //退出登录提示框
  function showExitConfirm() {
    var confirmPopup = $ionicPopup.confirm({
      title: '<strong>退出登录?</strong>',
      template: '<center>确定要退出吗?</center>',
      okText: '退出',
      cancelText: '取消'
    });
    confirmPopup.then(function (res) {
        if (res) {
          $state.go('login');
        }
      }
    );
  }

  $scope.logOut = function () {
    showExitConfirm();
  };
});
