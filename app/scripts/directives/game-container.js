'use strict';

angular.module('2048App')
  .directive('gameContainer', ['Actuator', 'InputManager', function (Actuator, InputManager) {
    return {
      controller: ['$scope', function($scope) {
        $scope.Actuator = Actuator;
      }],
      template: '<div class="game-container">' +
                  '<div class="game-message">' +
                    '<p></p>' +
                    '<div class="lower">' +
                      '<a class="keep-playing-button" ng-click="keepGoing()">Keep going</a>' +
                      '<a class="retry-button" ng-click="restart()">Try again</a>' +
                    '</div>' +
                  '</div>' +
                  '<game-grid></game-grid>' +
                  '<div class="tile-container">' +
                  '</div>' +
                '</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        new Actuator(element);
        new InputManager.get('keyboard')(element);
      }
    };
  }]);
