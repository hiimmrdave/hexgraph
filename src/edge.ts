import { NodeType, HexNode, QRSVector, EdgeNode } from "./types";
import * as Hex from "./hex";
import * as Cell from "./cell";
import * as Vertex from "./vertex";

/**
 *
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns a Edge-type HexNode
 */
export function make({ q, r, s }: QRSVector): HexNode {
  var edge = Hex.makeNode({ q, r, s }, NodeType.Edge);
  return edge as EdgeNode;
}

/**
 * @param edge - the edge of which to find the adjacent cells
 * @returns an array of 2 cells
 */
export function cells(edge: QRSVector): HexNode[] {
  return Cell.DIRECTIONS.map((e) =>
    Cell.make(Hex.add(edge, Hex.multiply(e, 0.5)))
  ).filter(
    (e) =>
      Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s)
  );
}

/**
 * @param edge  - the edge of which to find the adjacent edges
 * @returns an array of 4 edges
 */
export function edges(edge: QRSVector): HexNode[] {
  return Cell.DIRECTIONS.map((e) =>
    make(Hex.add(edge, Hex.multiply(e, 0.5)))
  ).filter(
    (e) =>
      !(Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s))
  );
}

/**
 * TODO: this funciton
 * @param edge  - the edge of which to find the adjacent vertices
 * @returns an array of 2 vertices
 */
export function vertices(edge: QRSVector): HexNode[] {
  return Cell.DIAGONALS.map((e) =>
    Vertex.make(Hex.add(edge, Hex.multiply(e, 1 / 6)))
  ).filter(
    (e) =>
      Number.isInteger(e.q * 3) &&
      Number.isInteger(e.r * 3) &&
      Number.isInteger(e.s * 3)
  );
}
