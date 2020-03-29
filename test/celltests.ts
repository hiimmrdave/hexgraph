import { expect } from "chai";
import { it } from "mocha";
import * as Cell from "../src/cell";
import { areEqual } from "../src/main";
import { NodeType } from "../src/types";

describe("Cell properties", function () {

  const origin = Object.freeze(Cell.makeCell({ q: 0, r: 0, s: 0 }));

  it("cell type should be Cell", () => {
    expect(origin.nodetype).to.equal(NodeType.Cell);
  });

  it("{q:0,r:0,s:0} should equal origin", () => {
    expect(areEqual(origin, { q: 0, r: 0, s: 0 })).to.be.true;
  });

  it("diagonals to origin should equal DIAGONALS", () => {
    expect(Cell.diagonals(origin)).to.deep.equal(Cell.DIAGONALS,"Diagonals are wrong");
  });

  it("neighbors to origin should equal DIRECTIONS", () =>{
    expect(Cell.cells(origin)).to.deep.equal(Cell.DIRECTIONS,"Directions are wrong");
  });

  it("edges should be half the coordinates of the edges",() =>{
    expect(Cell.edges(origin)).to.deep.equal(
      Cell.DIRECTIONS.map((e)=>Cell.multiply(e,0.5)),
      "Edges are wrong");
  });

});
