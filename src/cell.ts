import { qrsVector, HexNode } from "./types";
import { cubeLerp } from "./math";
import * as hex from "./hex";
import { NodeType } from "./types";
import * as Edge from "./edge";
import * as Vertex from "./vertex";

export const DIRECTIONS: qrsVector[] = [
  { q: 1, r: -1, s: 0 },
  { q: 0, r: -1, s: 1 },
  { q: -1, r: 0, s: 1 },
  { q: -1, r: 1, s: 0 },
  { q: 0, r: 1, s: -1 },
  { q: 1, r: 0, s: -1 },
];
export const DIAGONALS: qrsVector[] = [
  { q: 2, r: -1, s: -1 },
  { q: 1, r: -2, s: 1 },
  { q: -1, r: -1, s: 2 },
  { q: -2, r: 1, s: 1 },
  { q: -1, r: 2, s: -1 },
  { q: 1, r: 1, s: -2 },
];

/**
 *
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns a Cell-type HexNode
 */
export function make({ q, r, s }: qrsVector): HexNode {
  var cell = Object.assign(hex.makeNode({ q, r, s }), {
    nodetype: NodeType.Cell,
  });
  return cell;
}

/**
 * @param q - the absolute q coordinate to round to nearest cell
 * @param r - the absolute q coordinate to round to nearest cell
 * @param s - the absolute q coordinate to round to nearest cell
 * @returns a cell with integer q,r,s coordinates
 * nearest to the provided q,r,s point
 */
export function round({ q, r, s }: qrsVector): HexNode {
  const approx = {
      q: Math.round(q),
      r: Math.round(r),
      s: Math.round(s),
    },
    offset = {
      q: Math.abs(q - approx.q),
      r: Math.abs(r - approx.r),
      s: Math.abs(s - approx.s),
    };
  if (offset.q > offset.r && offset.q > offset.s) {
    approx.q = -1 * approx.r - approx.s;
  } else if (offset.r > offset.s) {
    approx.r = -1 * approx.q - approx.s;
  } else {
    approx.s = -1 * approx.q - approx.r;
  }
  return make(approx);
}

export function cellLerp(a: qrsVector, b: qrsVector, t: number): HexNode {
  return round(cubeLerp(a, b, t));
}

/**
 * @param cell - the cell of which to find neighbors
 * @returns an array of 6 cells
 */
export function cells(cell: qrsVector): HexNode[] {
  return DIRECTIONS.map((e) => make(hex.add(cell, e)));
}

/**
 * @param cell - the cell of which to find diagonal neighbors
 * @returns an array of 6 cells
 */
export function diagonals(cell: qrsVector): HexNode[] {
  return DIAGONALS.map((e) => make(hex.add(cell, e)));
}

/**
 * @param cell - the cell of which to find the edges
 * @returns an array of 6 edges
 */
export function edges(cell: qrsVector): HexNode[] {
  return DIRECTIONS.map((e) => Edge.make(hex.add(hex.multiply(e, 5e-1), cell)));
}

/**
 * @param cell - the cell of which to find the vertices
 * @returns an array of 6 vertices
 */
export function vertices(cell: qrsVector): HexNode[] {
  return DIAGONALS.map((e) =>
    Vertex.make(hex.add(cell, hex.multiply(e, 1 / 3)))
  );
}
