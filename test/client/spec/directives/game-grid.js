'use strict';

describe('Directive: gameGrid', function () {

  // load the directive's module
  beforeEach(module('2048App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<game-grid></game-grid>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the gameGrid directive');
  }));
});
