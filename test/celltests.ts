import { expect } from "chai";
import { it } from "mocha";
import * as hex from "../src/hex";
import * as Cell from "../src/cell";
import * as Edge from "../src/edge";
import * as Vertex from "../src/vertex";

describe("Cell properties", function() {
  const origin = Object.freeze(Cell.make({ q: 0, r: 0, s: 0 }));

  it("{q:0,r:0,s:0,nodetype:0} should equal origin", () => {
    expect(hex.areEqual(origin, { q: 0, r: 0, s: 0, nodetype: 0 })).to.be.true;
  });

  it("diagonals to origin should equal DIAGONALS", () => {
    let subject = Cell.diagonals(origin).map(({ id, q, r, s, nodetype }) => ({
      id,
      q,
      r,
      s,
      nodetype
    }));
    let result = Cell.DIAGONALS.map(e => {
      const each = Cell.make(e);
      return {
        id: each.id,
        q: each.q,
        r: each.r,
        s: each.s,
        nodetype: each.nodetype
      };
    });
    expect(subject).to.deep.equal(result, "Diagonals are wrong");
  });

  it("neighbors to origin should equal DIRECTIONS", () => {
    let subject = Cell.cells(origin).map(({ id, q, r, s, nodetype }) => ({
      id,
      q,
      r,
      s,
      nodetype
    }));
    //console.table(subject);
    let result = Cell.DIRECTIONS.map(e => {
      const each = Cell.make(e);
      return {
        id: each.id,
        q: each.q,
        r: each.r,
        s: each.s,
        nodetype: each.nodetype
      };
    });
    expect(subject).to.deep.equal(result, "Directions are wrong");
  });

  it("edges should be half the coordinates of the neighbors", () => {
    let subject = Cell.edges(origin).map(({ id, q, r, s, nodetype }) => ({
      id,
      q,
      r,
      s,
      nodetype
    }));
    //console.table(subject);
    let result = Cell.DIRECTIONS.map(e => {
      const each = Edge.make(hex.multiply(e, 0.5));
      return {
        id: each.id,
        q: each.q,
        r: each.r,
        s: each.s,
        nodetype: each.nodetype
      };
    });
    expect(subject).to.deep.equal(result, "Edges are wrong");
  });

  it("vertices should be 1/3 the coordinates of the diagonals", () => {
    let subject = Cell.vertices(origin).map(({ id, q, r, s, nodetype }) => ({
      id,
      q,
      r,
      s,
      nodetype
    }));
    //console.table(subject);
    let result = Cell.DIAGONALS.map(e => {
      const each = Vertex.make(hex.multiply(e, 1 / 3));
      return {
        id: each.id,
        q: each.q,
        r: each.r,
        s: each.s,
        nodetype: each.nodetype
      };
    });
    expect(subject).to.deep.equal(result, "Vertices are wrong");
  });
});
