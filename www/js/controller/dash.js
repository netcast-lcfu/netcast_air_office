/**
 * Created by Administrator on 2017.06.30 0030.
 */
var appController = angular.module('starter.controllers');

//首页控制器
appController.controller('DashCtrl', function ($scope, $ionicActionSheet) {
  // 隐藏返回按钮
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });
  $scope.showSpeedyMenu = function () {
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        {text: '新建线索'},
        {text: '新建机会'},
        {text: '创建任务'},
        {text: '写跟进'},
        {text: '录客户'}
      ],
      // destructiveText: '关闭', //红色文本提示
      titleText: '请选择功能',
      cancelText: '取消',
      cancel: function () {
        // add cancel code..
      },
      destructiveButtonClicked: function () {
        //点击了警告按钮
        console.log('You click destructive button');
        return true;
      },
      buttonClicked: function (index) {
        //下标从0开始
        console.log('You click index is ' + index);
        return true;
      }
    });
  };
});
