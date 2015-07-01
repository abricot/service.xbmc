"use strict";
angular.module('services.jsonp', [])
.factory('jsonp', ['$rootScope', '$q', '$http', '$parse', '$interpolate',
  function ($rootScope, $q, $http, $parse, $interpolate) {
    // We return this object to anything injecting our service
    var factory = {};
    var isConnected = false;
    var urlFn;

    factory.isConnected = function () {
      return isConnected;
    };

    factory.register = function (method, callback) {
    };

    factory.send = function (method, params, shouldDefer, pathExpr) {
      var defer = $q.defer();
      var request =JSON.stringify(request);
      var url = urlFn({request : request})
      $http.jsonp(url).success(function (data) {
        var obj = data;
        if (pathExpr) {
          var getter = $parse(pathExpr);
          obj = getter(data);
        } else {
          obj = data;
        }
        defer.resolve(obj);
      });
      return defer.promise;
    };

    factory.unregister = function (method, callback) {
    };

    factory.connect = function (partial, connectCallback, disconnectCallback) {
      urlFn = $interpolate('http://'+partial+'?request={{request}}&callback=JSON_CALLBACK');
      isConnected = true;
      connectCallback();
    };
    
    factory.subscribe = function (callback) {
    };

    return factory;
  }
]);