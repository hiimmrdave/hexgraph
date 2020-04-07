import { NodeType, HexNode } from "./types";
import { makeNode } from "./main";
import { makeCell } from "./cell";
import { makeVertex } from "./vertex";

/**
 *
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns a Edge-type HexNode
 */
export function makeEdge({ q, r, s }: Partial<HexNode>): HexNode {
  return makeNode({ q, r, s }, NodeType.Edge);
}

/**
 * TODO: this function
 * @param edge - the edge of which to find the adjacent cells
 * @returns an array of 2 cells
 */
export function cells(edge: HexNode): HexNode[] {
  return [makeCell(edge)];
}

/**
 * TODO: this function
 * @param edge  - the edge of which to find the adjacent edges
 * @returns an array of 4 edges
 */
export function edges(edge: HexNode): HexNode[] {
  return [makeEdge(edge)];
}

/**
 * TODO: this funciton
 * @param edge  - the edge of which to find the adjacent vertices
 * @returns an array of 2 vertices
 */
export function vertices(edge: HexNode): HexNode[] {
  return [makeVertex(edge)];
}
