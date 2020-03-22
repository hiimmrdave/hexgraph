import { expect } from "chai";
import * as Cell from "../src/cell";
import { areEqual } from "../src/main"
import { NodeType } from "../src/types"

describe("Cell properties", function () {

  const origin = Object.freeze(Cell.makeCell({ q: 0, r: 0, s: 0 }));

  it("cell type should be Cell", () => {
    expect(origin.type).to.equal(NodeType.Cell);
  });

  it("{q:0,r:0,s:0} should equal origin", () => {
    expect(areEqual(origin, { q: 0, r: 0, s: 0 })).to.be.true;
  });

});
