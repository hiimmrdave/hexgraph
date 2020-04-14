import { expect } from "chai";
import { it } from "mocha";
import { HexNode } from "../src/types";
import { areEqual } from "../src/main";
import { NodeType } from "../src/types";
import * as Cell from "../src/cell";
import * as Vertex from "../src/vertex";

describe("Vertex properties", function() {
  const cellVertices: HexNode[] = Cell.vertices(
    Cell.make({ q: 0, r: 0, s: 0 })
  );

  it("Cell.vertices(origin)[0] is 2/3, -1/3, -1/3 and a vertex", () => {
    let subject = cellVertices[0];
    console.table(subject);
    let result = Vertex.make({ q: 2 / 3, r: -1 / 3, s: -1 / 3 });
    expect(areEqual(subject, result));
  });

  it("a vertex has three adjacent vertices", () => {
    let subject: HexNode[] = Vertex.vertices(cellVertices[0]);
    console.table(subject);
    let result = 3;
    expect(subject.length).to.equal(result, "wrong number of adjacent nodes");
    subject.forEach(e => {
      expect(e.nodetype).to.equal(NodeType.Vertex, "wrong adjacent node type");
    });
  });

  it("a vertex has three adjacent cells", () => {
    let subject: HexNode[] = Vertex.cells(cellVertices[0]);
    console.table(subject);
    let result = 3;
    expect(subject.length).to.equal(result, "wrong number of adjacent nodes");
    subject.forEach(e => {
      expect(e.nodetype).to.equal(NodeType.Cell, "wrong adjacent node type");
    });
  });

  it("a vertex has three adjacent edges", () => {
    let subject: HexNode[] = Vertex.edges(cellVertices[0]);
    console.table(subject);
    let result = 3;
    expect(subject.length).to.equal(result, "wrong number of adjacent nodes");
    subject.forEach(e => {
      expect(e.nodetype).to.equal(NodeType.Edge, "wrong adjacent node type");
    });
  });
});
