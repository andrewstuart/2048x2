'use strict';

angular.module('2048App')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
