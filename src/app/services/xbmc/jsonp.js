"use strict";
angular.module('services.jsonp', [])
.factory('jsonp', ['$rootScope', '$q', '$http', '$parse', '$interpolate',
  function ($rootScope, $q, $http, $parse, $interpolate) {
    // We return this object to anything injecting our service
    var factory = {};
    var isConnected = false;
    var urlFn;
    var msgCallback;
    factory.isConnected = function () {
      return isConnected;
    };

    factory.register = function (method, callback) {
    };

    factory.send = function (request) {
      var defer = $q.defer();
      var request =JSON.stringify(request);
      var url = urlFn({request : request})
      $http.jsonp(url).success(function (data) {
        msgCallback(data);
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
      msgCallback = callback
    };

    return factory;
  }
]);