import { QRSVector, HexNode, CellNode, NodeType } from "./types";
import { cubeLerp } from "./math";
import * as Hex from "./hex";
import * as Edge from "./edge";
import * as Vertex from "./vertex";

export const DIRECTIONS: QRSVector[] = [
  { q: 1, r: -1, s: 0 },
  { q: 0, r: -1, s: 1 },
  { q: -1, r: 0, s: 1 },
  { q: -1, r: 1, s: 0 },
  { q: 0, r: 1, s: -1 },
  { q: 1, r: 0, s: -1 },
];
export const DIAGONALS: QRSVector[] = [
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
export function make({ q, r, s }: QRSVector): HexNode {
  var cell = Hex.makeNode({ q, r, s }, NodeType.Cell);
  return cell as CellNode;
}

/**
 * @param q - the absolute q coordinate to round to nearest cell
 * @param r - the absolute q coordinate to round to nearest cell
 * @param s - the absolute q coordinate to round to nearest cell
 * @returns a cell with integer q,r,s coordinates
 * nearest to the provided q,r,s point
 */
export function round({ q, r, s }: QRSVector): HexNode {
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

export function cellLerp(a: QRSVector, b: QRSVector, t: number): HexNode {
  return round(cubeLerp(a, b, t));
}

/**
 * @param cell - the cell of which to find neighbors
 * @returns an array of 6 cells
 */
export function cells(cell: QRSVector): HexNode[] {
  return DIRECTIONS.map((e) => make(Hex.add(cell, e)));
}

/**
 * @param cell - the cell of which to find diagonal neighbors
 * @returns an array of 6 cells
 */
export function diagonals(cell: QRSVector): HexNode[] {
  return DIAGONALS.map((e) => make(Hex.add(cell, e)));
}

/**
 * @param cell - the cell of which to find the edges
 * @returns an array of 6 edges
 */
export function edges(cell: QRSVector): HexNode[] {
  return DIRECTIONS.map((e) => Edge.make(Hex.add(Hex.multiply(e, 5e-1), cell)));
}

/**
 * @param cell - the cell of which to find the vertices
 * @returns an array of 6 vertices
 */
export function vertices(cell: QRSVector): HexNode[] {
  return DIAGONALS.map((e) =>
    Vertex.make(Hex.add(cell, Hex.multiply(e, 1 / 3)))
  );
}
