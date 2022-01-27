import { CellNode, makeNode, DIAGONALS, add, QRSVector } from "./hex.js";

/**
 * @param q - the absolute q coordinate to round to nearest cell
 * @param r - the absolute q coordinate to round to nearest cell
 * @param s - the absolute q coordinate to round to nearest cell
 * @returns a cell with integer q,r,s coordinates
 * nearest to the provided q,r,s point
 */
export function round({ q, r, s }: QRSVector): CellNode {
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
  return makeNode(approx, "Cell") as CellNode;
}

/**
 * @param cell - the cell of which to find diagonal neighbors
 * @returns an array of 6 cells
 */
export function diagonals(cell: CellNode): CellNode[] {
  return DIAGONALS.map((e) => makeNode(add(cell, e), "Cell") as CellNode);
}
