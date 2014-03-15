'use strict';

angular.module('2048App')
  .service('Tile', ['$timeout', function ($timeout) {
    function Tile(position, value) {
      var tile = this;
      var events = {};

      tile.on = function(event, cb) {
        events[event] = events[event] || [];
        events[event].push(cb);
      };

      tile.emit = function (event, data) {
        events[event] = events[event] || [];
        events[event].forEach(function(cb) {
          cb(data);
        });
      };

      tile.value = value || Math.random() < 0.9 ? 2 : 4;

      tile.previousPosition = null;
      tile.mergedFrom = []; // Tracks tiles that merged together

      tile.move = function (position) {
        tile.previousPosition = { x: tile.x, y: tile.y };

        tile.emit('move', position);

        tile.x = position.x;
        tile.y = position.y;
      };

      tile.merge = function(nextTile) {
        tile.mergedFrom = tile.mergedFrom || [];
        tile.mergedFrom.push(nextTile);

        tile.value += nextTile.value;
        nextTile.emit('remove');

        tile.emit('merge', nextTile);
      };

      //Initial move/insert
      $timeout(function() {
        tile.move(position);
      });
    }

    return {
      get: function(pos, val) {
        return new Tile(pos, val);
      }
    };
  }]);
