import { expect } from "chai";
import { it } from "mocha";
import { HexNode } from "../src/hex";
import * as Hex from "../src/hex";

describe("Vertex properties", function () {
  const cellVertices: HexNode[] = Hex.vertices(
    Hex.makeNode({ q: 0, r: 0, s: 0 }, "Cell")
  );

  it("Cell.vertices(origin)[0] is 2/3, -1/3, -1/3 and a vertex", () => {
    const subject = cellVertices[0];
    //console.table(subject);
    const result = Hex.makeNode({ q: 2 / 3, r: -1 / 3, s: -1 / 3 }, "Vertex");
    expect(Hex.areEqual(subject, result));
  });

  it("a vertex has three adjacent vertices", () => {
    const subject: HexNode[] = Hex.vertices(cellVertices[0]);
    //console.table(subject);
    const result = 3;
    expect(subject.length).to.equal(result, "wrong number of adjacent nodes");
    subject.forEach((e) => {
      expect(e.kind).to.equal("Vertex", "wrong adjacent node type");
    });
  });

  it("a vertex has three adjacent cells", () => {
    const subject: HexNode[] = Hex.cells(cellVertices[0]);
    //console.table(subject);
    const result = 3;
    expect(subject.length).to.equal(result, "wrong number of adjacent nodes");
    subject.forEach((e) => {
      expect(e.kind).to.equal("Cell", "wrong adjacent node type");
    });
  });

  it("a vertex has three adjacent edges", () => {
    const subject: HexNode[] = Hex.edges(cellVertices[0]);
    //console.table(subject);
    const result = 3;
    expect(subject.length).to.equal(result, "wrong number of adjacent nodes");
    subject.forEach((e) => {
      expect(e.kind).to.equal("Edge", "wrong adjacent node type");
    });
  });
});
