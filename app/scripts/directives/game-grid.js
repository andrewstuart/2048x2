'use strict';

angular.module('2048App')
  .directive('gameGrid', ['Tile', function (Tile) {
    return {
      template: '<div class="grid-container">' +
          '<div class="grid-row" ng-repeat="row in grid.cells track by $id(row)">' +
            '<div class="grid-cell" ng-repeat="cell in row track by cell.id"></div>' +
          '</div>' +
        '</div>' +
        '<div class="tile-container">' +
          '<div ng-repeat="tile in tiles" class="tile tile-new tile-{{tile.value}} tile-position-{{tile.x + 1}}-{{tile.y + 1}}">' +
          '<div class="tile-inner">{{tile.value}}</div>' +
        '</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.tiles = Tile.list;

        scope.$watch('tiles', function() {
          console.log(scope.tiles);
        }, true);
      }
    };
  }]);
