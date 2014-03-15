'use strict';

describe('Service: actuator', function () {

  // load the service's module
  beforeEach(module('2048App'));

  // instantiate service
  var actuator;
  beforeEach(inject(function (_actuator_) {
    actuator = _actuator_;
  }));

  it('should do something', function () {
    expect(!!actuator).toBe(true);
  });

});
