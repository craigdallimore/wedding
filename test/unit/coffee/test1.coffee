assert = chai.assert
expect = chai.expect
should = chai.should()

describe 'App', ->

  spy = null

  App.addOne = sinon.stub().returns(42);

  beforeEach ->
    spy = sinon.spy App, 'start'

  afterEach ->
    App.start.restore()

  it 'has a start method', ->
    App.should.have.property 'start'

  it 'can be stubbed', ->
    chai.assert.equal(App.addOne(1), 42)

  it 'has working spies', ->
    App.start()
    App.start.should.have.been.called

