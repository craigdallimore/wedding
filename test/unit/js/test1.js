(function() {
  var assert, expect, should;

  assert = chai.assert;

  expect = chai.expect;

  should = chai.should();

  describe('App', function() {
    var spy;
    spy = null;
    App.addOne = sinon.stub().returns(42);
    beforeEach(function() {
      return spy = sinon.spy(App, 'start');
    });
    afterEach(function() {
      return App.start.restore();
    });
    it('has a start method', function() {
      return App.should.have.property('start');
    });
    it('can be stubbed', function() {
      return chai.assert.equal(App.addOne(1), 42);
    });
    return it('has working spies', function() {
      App.start();
      return App.start.should.have.been.called;
    });
  });

}).call(this);
