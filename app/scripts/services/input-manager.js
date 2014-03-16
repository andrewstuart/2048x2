'use strict';

angular.module('2048App')
.service('InputManager', ['$document', function ($document) {

  function KeyboardInputManager() {
    var input = this;
    var events = {};

    input.on = function(event, cb) {
      events[event] = events[event] || [];
      events[event].push(cb);
    };

    function emit(event, data) {
      events[event] = events[event] || [];

      events[event].forEach(function(callback) {
        callback(data);
      });
    }

    var map = {
      38: 0, // Up
      39: 1, // Right
      40: 2, // Down
      37: 3, // Left
      75: 0, // vim keybindings
      76: 1,
      74: 2,
      72: 3,
      87: 0, // W
      68: 1, // D
      83: 2, // S
      65: 3  // A
    };

    function restart() {
      emit("restart");
    }

    $document.on("keydown", function (event) {
      var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
        event.shiftKey;
      var direction    = map[event.which];

      if (!modifiers) {

        if (direction !== undefined) {
          event.preventDefault();
          emit("move", direction);
        }

        if (event.which === 32) {
          event.preventDefault();
          restart();
        }
      }
    });

    input.attachTouch = function(gameContainer) {
      var touch = {};
      gameContainer.addEventListener("touchstart", function (event) {
        if (event.touches.length > 1) return;

        touch.x = event.touches[0].clientX;
        touch.y = event.touches[0].clientY;

        event.preventDefault();
      });

      gameContainer.addEventListener("touchmove", function (event) {
        event.preventDefault();
      });

      gameContainer.addEventListener("touchend", function (event) {
        if (event.touches.length > 0) return;

        var dx = event.changedTouches[0].clientX - touch.x;
        var absDx = Math.abs(dx);

        var dy = event.changedTouches[0].clientY - touch.y;
        var absDy = Math.abs(dy);

        if (Math.max(absDx, absDy) > 10) {
          // (right : left) : (down : up)
          emit("move", absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0));
        }
      });
    };
  }

  return new KeyboardInputManager();
}]);
