'use strict';

describe('Service: KeyboardManager', function () {

  // load the service's module
  beforeEach(module('2048App'));

  // instantiate service
  var KeyboardManager;
  beforeEach(inject(function (_KeyboardManager_) {
    KeyboardManager = _KeyboardManager_;
  }));

  it('should do something', function () {
    expect(!!KeyboardManager).toBe(true);
  });

});
