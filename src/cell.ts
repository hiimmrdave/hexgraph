import { CubeVector, HexNode } from "./types";
import { cubeLerp } from "./math";
import { makeNode } from "./main";
import { NodeType } from "./types";
import { makeEdge } from "./edge";
import { makeVertex } from "./vertex";

export const DIRECTIONS: CubeVector[] = [
  { q: 1, r: 0, s: -1 },
  { q: 1, r: -1, s: 0 },
  { q: 0, r: -1, s: 1 },
  { q: -1, r: 0, s: 1 },
  { q: -1, r: 1, s: 0 },
  { q: 0, r: 1, s: -1 }
];
export const DIAGONALS: CubeVector[] = [
  { q: 2, r: -1, s: -1 },
  { q: 1, r: -2, s: 1 },
  { q: -1, r: -1, s: 2 },
  { q: -2, r: 1, s: 1 },
  { q: -1, r: 2, s: -1 },
  { q: 1, r: 1, s: -2 }
];

/**
 *
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns a Cell-type HexNode
 */
export function makeCell({ q, r, s }: CubeVector): HexNode {
  var cell = Object.assign(makeNode({ q, r, s }), { nodetype: NodeType.Cell });
  //cells(cell).forEach(el => cell.links.add(el));
  edges(cell).forEach(el => cell.links.add(el));
  vertices(cell).forEach(el => cell.links.add(el));
  return cell;
}

export function add(a: CubeVector | HexNode, b: CubeVector): CubeVector {
  return { q: a.q + b.q, r: a.r + b.r, s: a.s + b.s };
}

export function subtract(a: CubeVector | HexNode, b: CubeVector): CubeVector {
  return { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s };
}

export function multiply(cell: CubeVector | HexNode, k: number): CubeVector {
  return { q: cell.q * k, r: cell.r * k, s: cell.s * k };
}

/**
 * @param q - the absolute q coordinate to round to nearest cell
 * @param r - the absolute q coordinate to round to nearest cell
 * @param s - the absolute q coordinate to round to nearest cell
 * @returns a cell with integer q,r,s coordinates
 * nearest to the provided q,r,s point
 */
export function round({ q, r, s }: CubeVector | HexNode): HexNode {
  const approx = {
      q: Math.round(q),
      r: Math.round(r),
      s: Math.round(s)
    },
    offset = {
      q: Math.abs(q - approx.q),
      r: Math.abs(r - approx.r),
      s: Math.abs(s - approx.s)
    };
  if (offset.q > offset.r && offset.q > offset.s) {
    approx.q = -1 * approx.r - approx.s;
  } else if (offset.r > offset.s) {
    approx.r = -1 * approx.q - approx.s;
  } else {
    approx.s = -1 * approx.q - approx.r;
  }
  return makeCell(approx);
}

export function cellLerp(
  a: CubeVector | HexNode,
  b: CubeVector | HexNode,
  t: number
): HexNode {
  return round(cubeLerp(a, b, t));
}

/**
 * @param cell - the cell of which to find neighbors
 * @returns an array of 6 cells
 */
export function cells(cell: HexNode): HexNode[] {
  return DIRECTIONS.map(e => makeCell(add(cell, e)));
}

/**
 * @param cell - the cell of which to find diagonal neighbors
 * @returns an array of 6 cells
 */
export function diagonals(cell: HexNode): HexNode[] {
  return DIAGONALS.map(e => makeCell(add(cell, e)));
}

/**
 * @param cell - the cell of which to find the edges
 * @returns an array of 6 edges
 */
export function edges(cell: HexNode): HexNode[] {
  return DIRECTIONS.map(e => makeEdge(add(multiply(e, 5e-1), cell)));
}

/**
 * @param cell - the cell of which to find the vertices
 * @returns an array of 6 vertices
 */
export function vertices(cell: HexNode): HexNode[] {
  return DIAGONALS.map(el => makeVertex(add(cell, multiply(el, 1 / 3))));
}
