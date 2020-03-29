import { CubeVector, HexNode, QRS } from "./types.js";
import { cubeLerp } from "./math.js";
import { makeNode } from "./main.js";
import { NodeType } from "./types.js";
import { makeEdge } from "./edge.js";
import { makeVertex } from "./vertex.js";

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

export function add(a: QRS, b: CubeVector): QRS {
  return Object.assign({...a}, { q: a.q + b.q, r: a.r + b.r, s: a.s + b.s });
}

export function subtract(a: QRS, b: CubeVector): QRS {
  return Object.assign({...a}, { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s });
}

export function multiply(cell: QRS, k: number): QRS {
  return Object.assign({...cell}, { q: cell.q * k, r: cell.r * k, s: cell.s * k });
}

export function round({ q, r, s }: QRS): HexNode {
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

export function cellLerp(a: CubeVector, b: CubeVector, t: number): HexNode {
  return round(cubeLerp(a, b, t));
}

export function cells(cell: QRS): HexNode[] {
  return DIRECTIONS.map(e => makeCell(add(cell, e)));
}

export function diagonals(cell: QRS): HexNode[] {
  return DIAGONALS.map(e => makeCell(add(cell, e)));
}

export function edges(cell: QRS): HexNode[] {
  return DIRECTIONS.map(e => makeEdge(multiply(add(cell, e), 5e-1)));
}
// TODO: Write this function
export function vertices(cell: QRS): HexNode[] {
  return [].map(el => makeVertex(cell));
}

/**
 *
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns a Cell-type HexNode
 */
export function makeCell({ q, r, s }: CubeVector): HexNode {
  return Object.assign(makeNode({ q, r, s }), { nodetype: NodeType.Cell });
}
