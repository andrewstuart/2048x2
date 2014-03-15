'use strict';

describe('Directive: gridCell', function () {

  // load the directive's module
  beforeEach(module('2048App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<grid-cell></grid-cell>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the gridCell directive');
  }));
});
