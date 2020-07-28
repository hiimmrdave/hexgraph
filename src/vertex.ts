import { QRSVector, NodeType, HexNode, VertexNode } from "./types";
import * as Hex from "./hex";
import * as Cell from "./cell";
import * as Edge from "./edge";

/**
 *
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns a Vertex-type HexNode
 */
export function make({ q, r, s }: QRSVector): HexNode {
  var vertex = Hex.makeNode({ q, r, s }, NodeType.Vertex);
  return vertex as VertexNode;
}

/**
 * @param vertex - the vertex of which to find adjacent cells
 * @returns an array of 3 cells
 */
export function cells(vertex: HexNode): HexNode[] {
  return Cell.DIAGONALS.map((e) =>
    Cell.make(Hex.add(vertex, Hex.multiply(e, 1 / 3)))
  ).filter(
    (e) =>
      Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s)
  );
}

/**
 * @param vertex - the vertex of which to find adjacent edges
 * @returns an array of 3 edges
 */
export function edges(vertex: HexNode): HexNode[] {
  return Cell.DIAGONALS.map((e) =>
    Edge.make(Hex.add(vertex, Hex.multiply(e, 1 / 6)))
  ).filter(
    (e) =>
      Number.isInteger(e.q * 2) &&
      Number.isInteger(e.r * 2) &&
      Number.isInteger(e.s * 2)
  );
}

/**
 * @param vertex - the vertex of which to find adjacent vertices
 * @returns an array of 3 vertices
 */
export function vertices(vertex: HexNode): HexNode[] {
  return Cell.DIAGONALS.map((e) =>
    make(Hex.add(vertex, Hex.multiply(e, 1 / 3)))
  ).filter(
    (e) =>
      !(Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s))
  );
}
