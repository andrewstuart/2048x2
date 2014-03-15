'use strict';

angular.module('2048App')
  .directive('gameGrid', [function () {
    return {
      controller: ['$scope', function($scope) {
        $scope.classes = function(row, col) {
          return {

          };
        };
      }],
      template: '<div class="grid-container">' +
      '<div class="grid-row" ng-repeat="row in grid.cells track by $id(row)">' +
        '<grid-cell ng-repeat="cell in row track by cell.id"></div>' +
      '</div>' +
    '</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  }]);
