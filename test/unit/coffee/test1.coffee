assert = chai.assert
expect = chai.expect
should = chai.should()

describe 'App', ->

  it 'has a start method', ->
    App.should.have.property 'start'
