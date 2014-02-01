define([ 'app/main' ], function(Main) {

  describe('defaults test suite', function() {

    it('works fine', function() {

      expect(true).to.equal(true);

    });

    it('supports sinonChai spies', function() {

      var obj = {
        foo: function() { return 'bar'; }
      };

      var spy = sinon.spy(obj, 'foo');

      expect(obj.foo('baz')).to.equal('bar');
      spy.should.have.been.calledWith('baz');

    });

    describe('addOne Test', function() {

      it('Should be 42; stubbed by sinon.', function() {

        var AddOne = {};
        AddOne.addOne = sinon.stub().returns(42);
        assert.equal(AddOne.addOne(1), 42);

      });

    });

  });

});
