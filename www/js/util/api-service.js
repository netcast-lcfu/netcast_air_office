var appService = angular.module("starter.services");
/**
 * 通用API接口
 */
appService.factory('ApiService', function ($http, $q, $filter, ApiEndpoint) {

  var postConfig = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function (data) {
      return $.param(data);
    }
  };

  var login = function (account,password) {
    console.log('into api service bind method...');
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/jsonBindingAction!login.action',
      params: {
        account: account,
        password: password
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service login success");
          return response.data;
        } else {
          console.log("api service login invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service login error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  //获取巡检表格数据
  var getInspTableData = function (inspEquId) {
    console.log("into api service getInspTableData method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/jsonYearImplAction!getJson.action?' + inspEquId,
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getInspTableData success");
          return response.data;
          console.log(response.data);
        } else {
          console.log("api service getInspTableData invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getInspTableData error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  //提交巡检表格数据
  var submitInspTableData = function (inspTableData) {
    console.log("into api service submitInspTableData method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/jsonYearImplAction!returnJson.action?'+inspTableData,
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service submitInspTableData success");
          return response.data;
          console.log(response.data);
        } else {
          console.log("api service submitInspTableData invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service submitInspTableData error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };


  return {
    login: login,
    getInspTableData: getInspTableData,
    submitInspTableData:submitInspTableData
  }
});

