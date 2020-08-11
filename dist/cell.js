import { cubeLerp } from "./math.js";
import * as Hex from "./hex.js";
export function round({ q, r, s }) {
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
  return Hex.makeNode(approx, "Cell");
}
export function lerp(a, b, t) {
  return round(cubeLerp(a, b, t));
}
export function diagonals(cell) {
  return Hex.DIAGONALS.map(e => Hex.makeNode(Hex.add(cell, e), "Cell"));
}
//# sourceMappingURL=cell.js.map
