const expect = require('chai').expect,
  hex = require('../index');

describe("Cell functions" ,function() {

  const origin = hex.makeCell({q:0,r:0,s:0});
  it("cell type should be Cell",() => {
    expect(origin.type).to.equal(0);
  });
  it("{q:0,r:0,s:0} should equal origin",()=> {
    expect(hex.areEqual(origin,{q:0,r:0,s:0})).to.be.true;
  });
});
