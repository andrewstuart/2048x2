'use strict';
var a;

angular.module('2048App')
  .service('Grid', ['Tile', 'AngularSocket', function (Tile, Socket) {

    console.log(Socket);
    a = Socket.get('foo', 'ws://localhost:12345/echo');

    a.emit('yo').then(function(res) {
      console.log('response');
      console.log(res);
    });
    

    function Grid(size) {
      var grid = this;

      grid.cells = [];

      var id = 0;

      function build() {
        for (var x = 0; x < size; x++) {
          var row = grid.cells[x] = [];

          for (var y = 0; y < size; y++) {
            row.push({id: id++, tile: null});
          }
        }
      }

      grid.withinBounds = function(position) {
        return position.x > 0 && position.x <= size && position.y >= 0 && position.y < size;
      };

      grid.cellContent = function (cell) {
        if (grid.withinBounds(cell)) {
          return grid.cells[cell.x][cell.y].tile;
        } else {
          return null;
        }
      };

      grid.addTile = function() {
        //Get available cells
        var openCells = [];
        for (var x = 0; x < size; x++) {
          for (var y = 0; y < size; y++) {
            if(!grid.cellContent({x: x, y: y})) {
              openCells.push({x: x, y: y});
            }
          }
        }

        if(openCells.length) {
          var randomCell = openCells[Math.floor(Math.random() * openCells.length)];
          console.log(randomCell.x, randomCell.y);
          var newTile = Tile.get(randomCell);

          newTile.on('move', function(newCell) {
            if(newTile.x && newTile.y)
              grid.cells[newTile.x][newTile.y].tile = null;

            grid.cells[newCell.x][newCell.y].tile = newTile;
          });

          newTile.on('remove', function() {
            grid.cells[newTile.x][newTile.y].tile = null;
          });
        } else {
          return false;
        }
      };

      build();
    }

    return {
      get: function(size) {
        return new Grid(size);
      }
    };
  }]);
