import { NodeType, HexNode } from "./types";
import * as main from "./main";
import * as Cell from "./cell";
import * as Vertex from "./vertex";

/**
 *
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns a Edge-type HexNode
 */
export function make({ q, r, s }: Partial<HexNode>): HexNode {
  var edge: HexNode = Object.assign(main.makeNode({ q, r, s }), {
    nodetype: NodeType.Edge,
  });
  return edge;
}

/**
 * @param edge - the edge of which to find the adjacent cells
 * @returns an array of 2 cells
 */
export function cells(edge: HexNode): HexNode[] {
  return Cell.DIRECTIONS.map((e) =>
    Cell.make(main.add(edge, main.multiply(e, 0.5)))
  ).filter(
    (e) =>
      Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s)
  );
}

/**
 * @param edge  - the edge of which to find the adjacent edges
 * @returns an array of 4 edges
 */
export function edges(edge: HexNode): HexNode[] {
  return Cell.DIRECTIONS.map((e) =>
    make(main.add(edge, main.multiply(e, 0.5)))
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
export function vertices(edge: HexNode) {
  return Cell.DIAGONALS.map((e) =>
    Vertex.make(main.add(edge, main.multiply(e, 1 / 6)))
  ).filter(
    (e) =>
      Number.isInteger(e.q * 3) &&
      Number.isInteger(e.r * 3) &&
      Number.isInteger(e.s * 3)
  );
}
