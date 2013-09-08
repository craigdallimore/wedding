(function() {
  var assert, expect, should;

  assert = chai.assert;

  expect = chai.expect;

  should = chai.should();

  describe('App', function() {
    before(function() {
      sinon.spy(App, 'start');
    });
    afterEach(function() {
      App.start.restore();
    });
    it('has a start method', function() {
      App.should.have.property('start');
    });
    it('can run spies', function() {
      App.start();
      App.start.should.have.been.called.once();
    });
  });

}).call(this);
