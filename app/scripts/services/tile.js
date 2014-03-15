'use strict';

angular.module('2048App')
  .service('Tile', function () {
    function Tile(position, value) {
      var tile = this;
      tile.x = position.x;
      tile.y = position.y;

      var events = {};

      tile.on = function(event, cb) {
        events[event] = events[event] || [];
        events[event].push(cb);
      });

      function emit(event, data) {
        events[event] = events[event] || [];
        events[event].forEach(function(cb) {
          cb(data);
        });
      }

      tile.value = value || Math.random() < 0.9 ? 2 : 4;

      tile.previousPosition = null;
      tile.mergedFrom = []; // Tracks tiles that merged together

      tile.move = function (position) {
        tile.previousPosition = { x: tile.x, y: tile.y };

        tile.x = position.x;
        tile.y = position.y;
      };
    }

    return Tile;
  });
