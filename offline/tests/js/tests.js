var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe("App", function(){

        it("is in the window namespace", function(){
            expect(window).to.have.property('App');
        });


});