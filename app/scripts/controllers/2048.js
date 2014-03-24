'use strict';

angular.module('2048App')
.controller('2048Ctrl', ['$scope', '$http', '$window', 'InputManager', 'ScoreManager', 'Grid', 'AngularSocket', function ($scope, $http, $window, InputManager, ScoreManager, Grid, AngularSocket) {
  window.requestAnimationFrame(function() {

  $scope.manager = ScoreManager;
  $scope.over = false;
  $scope.info = [];
  var grid;

  var sock = AngularSocket.get('2048', 'ws://localhost:12345/game');

  sock.on('grid', function(data) {
    $scope.grid = data;
  });

  $scope.restart = function() {
    sock.emit('move', {direction: -1})
  };

  // Set up the game
  function setup() {
    grid = $scope.grid = Grid.get(4);
    ScoreManager.score = 0;
    $scope.over = false;
    $scope.won = false;

    // Add the initial tiles
    var copy = 2;
    while(copy--) {
      grid.addTile();
    }
  }

  function restart() {
    sock.emit('move', {direction: -1}).then(function(grid) {
      console.log(grid);
    });
    $scope.message = undefined;
    setup();
  }

  InputManager.on('move', function(direction) {
    sock.emit('move', {direction: direction}).then(function(data) {
      $scope.grid = data;
    });
  });

  InputManager.on('restart', restart);
  InputManager.on('keepPlaying', $scope.keepPlaying);

  // Keep playing after winning
  $scope.keepPlaying = function () {
    $scope.over = false;
  };

  });
}]);
