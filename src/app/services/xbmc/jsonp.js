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
      var req = {
       method: 'POST',
       url: urlFn,
       headers: {
         'Content-Type': 'application/json'
       },
       data: request
      };
      $http(req).success(function (data) {
        msgCallback(JSON.stringify({data:data}));
      });
      return defer.promise;
    };

    factory.unregister = function (method, callback) {
    };

    factory.connect = function (partial, connectCallback, disconnectCallback) {
      urlFn = 'http://'+partial;
      isConnected = true;
      connectCallback();
    };

    factory.subscribe = function (callback) {
      msgCallback = callback
    };

    return factory;
  }
]);