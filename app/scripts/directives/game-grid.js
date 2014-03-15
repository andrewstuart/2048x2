'use strict';

angular.module('2048App')
  .directive('gameGrid', ['Actuator', 'InputManager', function (Actuator, InputManager) {
    return {
      controller: ['$scope', function($scope) {
      }],
      template: '<div class="grid-container">' +
      '<div class="grid-row">' +
        '<div class="grid-cell"></div>' +
        '<div class="grid-cell"></div>' +
        '<div class="grid-cell"></div>' +
        '<div class="grid-cell"></div>' +
      '</div>' +
      '<div class="grid-row">' +
        '<div class="grid-cell"></div>' +
        '<div class="grid-cell"></div>' +
        '<div class="grid-cell"></div>' +
        '<div class="grid-cell"></div>' +
      '</div>' +
      '<div class="grid-row">' +
        '<div class="grid-cell"></div>' +
        '<div class="grid-cell"></div>' +
        '<div class="grid-cell"></div>' +
        '<div class="grid-cell"></div>' +
      '</div>' +
      '<div class="grid-row">' +
        '<div class="grid-cell"></div>' +
        '<div class="grid-cell"></div>' +
        '<div class="grid-cell"></div>' +
        '<div class="grid-cell"></div>' +
      '</div>' +
    '</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  }]);
