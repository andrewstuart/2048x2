'use strict';

angular.module('2048App')
  .directive('gameGrid', [function () {
    return {
      template: '<div class="grid-container">' +
          '<div class="grid-row" ng-repeat="row in [1,2,3,4] track by $id(row)">' +
            '<div class="grid-cell" ng-repeat="cell in [1,2,3,4] track by $id(cell)"></div>' +
          '</div>' +
        '</div>' +
        '<div class="tile-container">' +
          '<div ng-repeat="tile in grid.Tiles track by tile.ID" ng-class="{\'tile-new\': tile.New, \'tile-merged\': tile.Merged}" class="tile tile-{{tile.Value}} tile-position-{{tile.Current.X + 1}}-{{tile.Current.Y + 1}}">' +
          '<div class="tile-inner">{{tile.Value}}</div>' +
          '</div>' +
        '</div>',
      restrict: 'E',
    };
  }]);
