'use strict';

angular.module('2048App')
.controller('2048Ctrl', ['$scope', '$http', '$window', 'InputManager', 'ScoreManager', 'Grid', 'Tile', function ($scope, $http, $window, InputManager, ScoreManager, Grid, Tile) {
  window.requestAnimationFrame(function() {

  $scope.manager = ScoreManager;
  $scope.over = false;

  var grid, gameTerminated, keepPlaying, startTiles = 2, size = 4;
  setup();

  function areEqual(a, b) {
    return a.x === b.x && a.y === b.y;
  }

  function getVector(direction) {
    var map = {
      0: { x: 0,  y: -1 }, // up
      1: { x: 1,  y: 0 },  // right
      2: { x: 0,  y: 1 },  // down
      3: { x: -1, y: 0 }   // left
    };

    return map[direction];
  }

  // Build a list of positions to traverse in the right order
  function buildTraversals (vector) {
    var traversals = { x: [], y: [] };

    for (var pos = 0; pos < size; pos++) {
      traversals.x.push(pos);
      traversals.y.push(pos);
    }

    // Always traverse from the farthest cell in the chosen direction
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    return traversals;
  }

  // Set up the game
  function setup() {
    grid = $scope.grid = Grid.get(size);
    ScoreManager.score = 0;
    $scope.over = false;
    $scope.won = false;

    // Add the initial tiles
    var copy = startTiles;
    while(copy--) {
      grid.addTile();
    }
  }

  function restart() {
    Tile.clearList();
    $scope.message = undefined;
    setup();
  }


  function move(direction) {
    if (gameTerminated) return; // Don't do anything if the game's over

    var cell, tile;

    var vector = getVector(direction);
    var traversals = buildTraversals(vector);
    var moved = false;

    // Traverse the grid in the right direction and move tiles
    traversals.x.forEach(function (x) {
      traversals.y.forEach(function (y) {
        cell = { x: x, y: y };
        tile = grid.cellContent(cell);

        if (tile) {
          var positions = findFarthestPosition(cell, vector);
          var next      = grid.cellContent(positions.next);

          // Only one merger per row traversal?
          if (next && next.value === tile.value && next.mergedFrom.indexOf(tile) === -1) {
            tile.merge(next);

            // Update the score
            ScoreManager.score += tile.value;
            ScoreManager.best = ScoreManager.score;

            // The mighty 2048 tile
            if (tile.value === 2048) {
              $scope.won = true;
            }
          } else {
            tile.move(positions.farthest);
          }

          if (!(cell.x === tile.x && cell.y === tile.y)) {
            moved = true; // The tile moved from its original cell!
          }
        }
      });
    });

    if (moved) {
      if(!grid.addTile()) {
        $scope.over = true; // Game over!
      }
    }
  }

  InputManager.on('move', function(direction) {move(direction)});
  InputManager.on('restart', restart);
  InputManager.on('keepPlaying', $scope.keepPlaying);

  // Keep playing after winning
  $scope.keepPlaying = function () {
    Tile.clearList();
    $scope.over = false;
  };

  function findFarthestPosition (cell, vector) {
    var previous;

    // Progress in the direciton of the vector direction until an obstacle is found
    do {
      previous = cell;
      cell     = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (grid.withinBounds(cell) && !grid.cellContent(cell));
    return {
      farthest: previous,
      next: cell // Used to check if a merge is required
    };
  }

  // Check for available matches between tiles (more expensive check)
  function tileMatchesAvailable () {
    var tile;

    for (var x = 0; x < size; x++) {
      for (var y = 0; y < size; y++) {
        tile = grid.cellContent({ x: x, y: y });

        if (tile) {
          for (var direction = 0; direction < 4; direction++) {
            var vector = getVector(direction);
            var cell   = { x: x + vector.x, y: y + vector.y };

            var other  = grid.cellContent(cell);

            if (other && other.value === tile.value) {
              return true; // These two tiles can be merged
            }
          }
        }
      }
    }

    return false;
  }

  });
}]);
