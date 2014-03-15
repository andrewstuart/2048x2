'use strict';

angular.module('2048App')
  .directive('gridCell', function () {
    return {
      template: '<div class="grid-cell"><div><div></div></div></div>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.$watch('grid.cellContent({x: $parent.$index, y: $index})', function(newVal, oldVal) {
          if(newVal && newVal.mergedFrom) {
            element.addClass('tile-merged');
          }
        });
      }
    };
  });
