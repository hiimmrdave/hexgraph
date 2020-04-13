import { CubeVector, NodeType, HexNode } from "./types";
import { makeNode } from "./main";
import { makeCell } from "./cell";
import { makeEdge } from "./edge";

/**
 *
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns a Vertex-type HexNode
 */
export function makeVertex({ q, r, s }: CubeVector): HexNode {
  var vertex: HexNode = Object.assign(makeNode({ q, r, s }), {
    nodetype: NodeType.Vertex
  });
  return vertex;
}

/**
 * TODO: this function
 * @param vertex - the vertex of which to find adjacent cells
 * @returns an array of 3 cells
 */
export function cells(vertex: HexNode): HexNode[] {
  return [makeCell(vertex)];
}

/**
 * TODO: this function
 * @param vertex - the vertex of which to find adjacent edges
 * @returns an array of 3 edges
 */
export function edges(vertex: HexNode): HexNode[] {
  return [makeEdge(vertex)];
}

/**
 * TODO: this function
 * @param vertex - the vertex of which to find adjacent vertices
 * @returns an array of 3 vertices
 */
export function vertices(vertex: HexNode): HexNode[] {
  return [makeVertex(vertex)];
}
