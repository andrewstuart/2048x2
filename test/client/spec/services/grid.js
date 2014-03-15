'use strict';

describe('Service: Grid', function () {

  // load the service's module
  beforeEach(module('2048App'));

  // instantiate service
  var Grid;
  beforeEach(inject(function (_Grid_) {
    Grid = _Grid_;
  }));

  it('should do something', function () {
    expect(!!Grid).toBe(true);
  });

});
