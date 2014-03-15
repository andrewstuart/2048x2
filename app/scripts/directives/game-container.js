'use strict';

angular.module('2048App')
  .directive('gameContainer', ['InputManager', function (InputManager) {
    return {
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
        if(attrs['game-user']) {
          InputManager.attachTouch(element);
        }
      }
    };
  }]);
