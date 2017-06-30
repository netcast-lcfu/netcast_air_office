/**
 * Created by Administrator on 2017.06.30 0030.
 */
var appController = angular.module('starter.controllers');

appController.controller('ContactCtrl', function ($scope, $stateParams, $location, $ionicScrollDelegate, Contacts) {

  var alphabets = iterateAlphabet();
  var contacts = Contacts.all();

  $scope.alphabet = iterateAlphabet();
  $scope.sorted_users = getShowData(alphabets, contacts);

  //Click letter event
  $scope.gotoList = function (id) {
    $location.hash(id);
    $ionicScrollDelegate.anchorScroll();
  };

  function getShowData(alphabets, contacts) {
    var show_datas = [];

    for (var i = 0; i < alphabets.length; i++) {
      var cur_data = [];
      for (var j = 0; j < contacts.length; j++) {
        var letter = contacts[j].name.toUpperCase().charAt(0);
        if (alphabets[i] == letter) {
          cur_data.push(contacts[j]);
        }
      }
      if (cur_data.length > 0) {
        var show_data = {
          "alphabet": alphabets[i],
          "data": cur_data
        };
        show_datas.push(show_data);
      }

    }
    return show_datas;
  }

  //Create alphabet object
  function iterateAlphabet() {
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numbers = new Array();
    for (var i = 0; i < str.length; i++) {
      var nextChar = str.charAt(i);
      numbers.push(nextChar);
    }
    return numbers;
  }

});
