'use strict';

describe('Service: Tile', function () {

  // load the service's module
  beforeEach(module('2048App'));

  // instantiate service
  var Tile;
  beforeEach(inject(function (_Tile_) {
    Tile = _Tile_;
  }));

  it('should do something', function () {
    expect(!!Tile).toBe(true);
  });

});
