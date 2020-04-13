import { CubeVector, NodeType, HexNode, Edge, Cell, Vertex } from "./types";
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
export function makeVertex({ q, r, s }: CubeVector): Vertex {
  var vertex: Vertex = Object.apply(makeNode({ q, r, s }), {
    nodetype: NodeType.Vertex
  });
  cells(vertex).forEach(el => vertex.links.add(el));
  edges(vertex).forEach(el => vertex.links.add(el));
  vertices(vertex).forEach(el => vertex.links.add(el));
  return vertex;
}

/**
 * TODO: this function
 * @param vertex - the vertex of which to find adjacent cells
 * @returns an array of 3 cells
 */
export function cells(vertex: HexNode): Cell[] {
  return [makeCell(vertex)];
}

/**
 * TODO: this function
 * @param vertex - the vertex of which to find adjacent edges
 * @returns an array of 3 edges
 */
export function edges(vertex: HexNode): Edge[] {
  return [makeEdge(vertex)];
}

/**
 * TODO: this function
 * @param vertex - the vertex of which to find adjacent vertices
 * @returns an array of 3 vertices
 */
export function vertices(vertex: HexNode): Vertex[] {
  return [makeVertex(vertex)];
}
