import {
  CellNode,
  add,
  multiply,
  DIRECTIONS,
  distance,
  areEqual,
  cells,
  QRSVector,
} from "./hex.js";
import { round } from "./cell.js";
import { cubeLerp } from "./math.js";

/**
 * @param center the center of the ring
 * @param radius the number of steps from the center to a cell on the ring
 */
export function ring(center: CellNode, radius: number): CellNode[] {
  if (radius < 1) return [center];
  let ringCell = add(center, multiply(DIRECTIONS[0], radius)) as CellNode;
  const ring = [];
  for (let ii = 0; ii < 6; ii++) {
    for (let ij = 0; ij < radius; ij++) {
      ring.push(ringCell);
      ringCell = cells(ringCell)[ii];
    }
  }
  return ring;
}

/**
 * @param start the Cell at the start of the line (inclusive)
 * @param end the Cell at the end of the line (inclusive)
 * @returns an array of the cells along a line
 */
export function line(start: CellNode, end: CellNode): CellNode[] {
  if (areEqual(start, end)) return [start];
  const t = distance(start, end);
  const line = [];
  for (let ii = 0; ii <= t; ii++) {
    line.push(round(cubeLerp(start, end, (1 / t) * ii) as CellNode));
  }
  return line;
}

//! gosh this is ugly. ALSO: could be DRYer
//TODO I should probably test this, since I made it up. uuuugggghhhhh
export function cone(
  start: CellNode,
  direction: QRSVector,
  range: number
): CellNode[] {
  const toward = {
      q: Math.abs(direction.q),
      r: Math.abs(direction.r),
      s: Math.abs(direction.s),
    },
    cone = [];
  switch (Math.max(toward.q, toward.r, toward.s)) {
    case direction.q:
      for (let ia = 0; ia < range; ia++) {
        for (let ib = 0; ib < range - ia; ib++) {
          const ic = -(ia + ib);
          cone.push(add(start, { q: -ic, r: -ia, s: -ib }));
        }
      }
      break;
    case -direction.r:
      for (let ia = 0; ia < range; ia++) {
        for (let ib = 0; ib < range - ia; ib++) {
          const ic = -(ia + ib);
          cone.push(add(start, { q: ib, r: ic, s: ia }));
        }
      }
      break;
    case direction.s:
      for (let ia = 0; ia < range; ia++) {
        for (let ib = 0; ib < range - ia; ib++) {
          const ic = -(ia + ib);
          cone.push(add(start, { q: -ia, r: -ib, s: -ic }));
        }
      }
      break;
    case -direction.q:
      for (let ia = 0; ia < range; ia++) {
        for (let ib = 0; ib < range - ia; ib++) {
          const ic = -(ia + ib);
          cone.push(add(start, { q: ic, r: ia, s: ib }));
        }
      }
      break;
    case direction.r:
      for (let ia = 0; ia < range; ia++) {
        for (let ib = 0; ib < range - ia; ib++) {
          const ic = -(ia + ib);
          cone.push(add(start, { q: -ib, r: -ic, s: -ia }));
        }
      }
      break;
    case -direction.s:
      for (let ia = 0; ia < range; ia++) {
        for (let ib = 0; ib < range - ia; ib++) {
          const ic = -(ia + ib);
          cone.push(add(start, { q: ia, r: ib, s: ic }));
        }
      }
      break;
  }
  return [start];
}
