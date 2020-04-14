import { expect } from "chai";
import { it } from "mocha";
import * as Edge from "../src/edge";
import { areEqual } from "../src/main";
import { NodeType } from "../src/types";
import * as Cell from "../src/cell";
import { HexNode } from "../src/types";

describe("Edge properties", function() {
  const cellEdges: HexNode[] = Cell.edges(Cell.makeCell({ q: 0, r: 0, s: 0 }));

  it("Cell.edges(origin)[0] is 1/2, -1/2, 0 and an edge", () => {
    let subject = cellEdges[0];
    console.table(subject);
    let result = Edge.makeEdge({ q: 0.5, r: -0.5, s: 0});
    expect(areEqual(subject, result));
  });

  it("an edge has four adjacent edges", () => {
    let subject: HexNode[] = Edge.edges(cellEdges[0]);
    console.table(subject);
    let result = 4;
    expect(subject.length).to.equal(result, "wrong number of adjacent nodes");
    subject.forEach(e => {
      expect(e.nodetype).to.equal(NodeType.Edge, "wrong adjacent node type");
    });
  });

  it("an edge has two adjacent cells", () => {
    let subject: HexNode[] = Edge.cells(cellEdges[0]);
    console.table(subject);
    let result = 2;
    expect(subject.length).to.equal(result, "wrong number of adjacent nodes");
    subject.forEach(e => {
      expect(e.nodetype).to.equal(NodeType.Cell, "wrong adjacent node type");
    });
  });

  it("an edge has two adjacent vertices",()=>{
    let subject = Edge.vertices(cellEdges[0]);
    console.table(subject);
    let result = 2;
    expect(subject.length).to.equal(result, "wrong number of adjacent nodes");
    subject.forEach(e => {
      expect(e.nodetype).to.equal(NodeType.Vertex, "wrong adjacent node type");
    });
  });
});
