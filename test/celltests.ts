import { expect } from "chai";
import { it } from "mocha";
import * as Hex from "../src/hex";
import * as Cell from "../src/cell";

describe("Cell properties", function () {
  const origin = Object.freeze(
    Hex.makeNode({ q: 0, r: 0, s: 0 }, "Cell")
  ) as Hex.CellNode;

  it("{q:0,r:0,s:0,nodetype:0} should equal origin", () => {
    expect(Hex.areEqual(origin, Hex.makeNode({ q: 0, r: 0, s: 0 }, "Cell"))).to
      .be.true;
  });

  it("diagonals to origin should equal DIAGONALS", () => {
    const subject = Cell.diagonals(origin).map(({ id, q, r, s, kind }) => ({
      id,
      q,
      r,
      s,
      kind,
    }));
    const result = Hex.DIAGONALS.map((e) => {
      const each = Hex.makeNode(e, "Cell");
      return {
        id: each.id,
        q: each.q,
        r: each.r,
        s: each.s,
        kind: each.kind,
      };
    });
    expect(subject).to.deep.equal(result, "Diagonals are wrong");
  });

  it("neighbors to origin should equal DIRECTIONS", () => {
    const subject = Hex.cells(origin).map(({ id, q, r, s, kind }) => ({
      id,
      q,
      r,
      s,
      kind,
    }));
    //console.table(subject);
    const result = Hex.DIRECTIONS.map((e) => {
      const each = Hex.makeNode(e, "Cell");
      return {
        id: each.id,
        q: each.q,
        r: each.r,
        s: each.s,
        kind: each.kind,
      };
    });
    expect(subject).to.deep.equal(result, "Directions are wrong");
  });

  it("edges should be half the coordinates of the neighbors", () => {
    const subject = Hex.edges(origin).map(({ id, q, r, s, kind }) => ({
      id,
      q,
      r,
      s,
      kind,
    }));
    //console.table(subject);
    const result = Hex.DIRECTIONS.map((e) => {
      const each = Hex.makeNode(Hex.multiply(e, 0.5), "Edge");
      return {
        id: each.id,
        q: each.q,
        r: each.r,
        s: each.s,
        kind: each.kind,
      };
    });
    expect(subject).to.deep.equal(result, "Edges are wrong");
  });

  it("vertices should be 1/3 the coordinates of the diagonals", () => {
    const subject = Hex.vertices(origin).map(({ id, q, r, s, nodetype }) => ({
      id,
      q,
      r,
      s,
      nodetype,
    }));
    //console.table(subject);
    const result = Hex.DIAGONALS.map((e) => {
      const each = Hex.makeNode(Hex.multiply(e, 1 / 3), "Vertex");
      return {
        id: each.id,
        q: each.q,
        r: each.r,
        s: each.s,
        kind: each.kind,
      };
    });
    expect(subject).to.deep.equal(result, "Vertices are wrong");
  });
});
