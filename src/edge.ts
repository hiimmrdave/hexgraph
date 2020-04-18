import { NodeType, HexNode, qrsVector } from "./types";
import * as hex from "./hex";
import * as Cell from "./cell";
import * as Vertex from "./vertex";

/**
 *
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns a Edge-type HexNode
 */
export function make({ q, r, s }: qrsVector): HexNode {
  var edge: HexNode = Object.assign(hex.makeNode({ q, r, s }), {
    nodetype: NodeType.Edge,
  });
  return edge;
}

/**
 * @param edge - the edge of which to find the adjacent cells
 * @returns an array of 2 cells
 */
export function cells(edge: qrsVector): HexNode[] {
  return Cell.DIRECTIONS.map((e) =>
    Cell.make(hex.add(edge, hex.multiply(e, 0.5)))
  ).filter(
    (e) =>
      Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s)
  );
}

/**
 * @param edge  - the edge of which to find the adjacent edges
 * @returns an array of 4 edges
 */
export function edges(edge: qrsVector): HexNode[] {
  return Cell.DIRECTIONS.map((e) =>
    make(hex.add(edge, hex.multiply(e, 0.5)))
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
export function vertices(edge: qrsVector): HexNode[] {
  return Cell.DIAGONALS.map((e) =>
    Vertex.make(hex.add(edge, hex.multiply(e, 1 / 6)))
  ).filter(
    (e) =>
      Number.isInteger(e.q * 3) &&
      Number.isInteger(e.r * 3) &&
      Number.isInteger(e.s * 3)
  );
}
