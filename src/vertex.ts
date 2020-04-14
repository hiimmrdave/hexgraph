import { CubeVector, NodeType, HexNode } from "./types";
import * as main from "./main";
import { makeCell, DIAGONALS } from "./cell";
import { makeEdge } from "./edge";

/**
 *
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns a Vertex-type HexNode
 */
export function makeVertex({ q, r, s }: CubeVector): HexNode {
  var vertex: HexNode = Object.assign(main.makeNode({ q, r, s }), {
    nodetype: NodeType.Vertex
  });
  return vertex;
}

/**
 * @param vertex - the vertex of which to find adjacent cells
 * @returns an array of 3 cells
 */
export function cells(vertex: HexNode): HexNode[] {
  return DIAGONALS.map(e =>
    makeCell(main.add(vertex, main.multiply(e, 1 / 3)))
  ).filter(
    e => Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s)
  );
}

/**
 * @param vertex - the vertex of which to find adjacent edges
 * @returns an array of 3 edges
 */
export function edges(vertex: HexNode): HexNode[] {
  return DIAGONALS.map(e =>
    makeEdge(main.add(vertex, main.multiply(e, 1 / 6)))
  ).filter(
    e =>
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
  return DIAGONALS.map(e =>
    makeVertex(main.add(vertex, main.multiply(e, 1 / 3)))
  ).filter(
    e =>
      !(Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s))
  );
}
