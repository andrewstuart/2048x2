'use strict';

describe('Service: InputManager', function () {

  // load the service's module
  beforeEach(module('2048App'));

  // instantiate service
  var InputManager;
  beforeEach(inject(function (_InputManager_) {
    InputManager = _InputManager_;
  }));

  it('should do something', function () {
    expect(!!InputManager).toBe(true);
  });

});
