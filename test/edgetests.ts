import { expect } from "chai";
import { it } from "mocha";
import { HexNode } from "../src/types";
import * as Hex from "../src/hex";
import { NodeType } from "../src/types";

describe("Edge properties", function() {
  const cellEdges: HexNode[] = Hex.edges(
    Hex.makeNode({ q: 0, r: 0, s: 0 }, NodeType.Cell)
  );

  it("Cell.edges(origin)[0] is 1/2, -1/2, 0 and an edge", () => {
    const subject = cellEdges[0];
    //console.table(subject);
    const result = Hex.makeNode({ q: 0.5, r: -0.5, s: 0 }, NodeType.Edge);
    expect(Hex.areEqual(subject, result));
  });

  it("an edge has four adjacent edges", () => {
    const subject: HexNode[] = Hex.edges(cellEdges[0]);
    //console.table(subject);
    const result = 4;
    expect(subject.length).to.equal(result, "wrong number of adjacent nodes");
    subject.forEach(e => {
      expect(e.nodetype).to.equal(NodeType.Edge, "wrong adjacent node type");
    });
  });

  it("an edge has two adjacent cells", () => {
    const subject: HexNode[] = Hex.cells(cellEdges[0]);
    //console.table(subject);
    const result = 2;
    expect(subject.length).to.equal(result, "wrong number of adjacent nodes");
    subject.forEach(e => {
      expect(e.nodetype).to.equal(NodeType.Cell, "wrong adjacent node type");
    });
  });

  it("an edge has two adjacent vertices", () => {
    const subject = Hex.vertices(cellEdges[0]);
    //console.table(subject);
    const result = 2;
    expect(subject.length).to.equal(result, "wrong number of adjacent nodes");
    subject.forEach(e => {
      expect(e.nodetype).to.equal(NodeType.Vertex, "wrong adjacent node type");
    });
  });
});
