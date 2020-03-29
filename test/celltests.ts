import { expect } from "chai";
import { it } from "mocha";
import * as Cell from "../src/cell";
import { areEqual } from "../src/main";
import { NodeType } from "../src/types";
import { makeEdge } from "../src/edge"

describe("Cell properties", function () {

  const origin = Object.freeze(Cell.makeCell({ q: 0, r: 0, s: 0 }));

  it("cell type should be Cell", () => {
    expect(origin.nodetype).to.equal(NodeType.Cell);
  });

  it("{q:0,r:0,s:0} should equal origin", () => {
    expect(areEqual(origin, { q: 0, r: 0, s: 0 })).to.be.true;
  });

  it("diagonals to origin should equal DIAGONALS", () => {
    let subject = Cell.diagonals(origin).map(e=>e.id);
    let result = Cell.DIAGONALS.map(e=>Cell.makeCell(e).id);
    expect(subject).to.deep.equal(result,"Diagonals are wrong");
  });

  it("neighbors to origin should equal DIRECTIONS", () =>{
    let subject = Cell.cells(origin).map(e=>e.id);
    let result = Cell.DIRECTIONS.map(e=>Cell.makeCell(e).id);
    expect(subject).to.deep.equal(result,"Directions are wrong");
  });

  it("edges should be half the coordinates of the edges",() =>{
    let subject = Cell.edges(origin).map(e=>e.id);
    let result = Cell.DIRECTIONS.map((e)=>makeEdge(Cell.multiply(e,0.5)).id);
    expect(subject).to.deep.equal(result,"Edges are wrong");
  });

});
