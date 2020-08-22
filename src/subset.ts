import {
  CellNode,
  add,
  multiply,
  DIRECTIONS,
  distance,
  areEqual,
  cells,
} from "./hex.js";
import { round } from "./cell.js";
import { cubeLerp } from "./math.js";

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

export function line(start: CellNode, end: CellNode): CellNode[] {
  if (areEqual(start, end)) return [start];
  const t = distance(start, end);
  const line = [];
  for (let ii = 0; ii <= t; ii++) {
    line.push(round(cubeLerp(start, end, (1 / t) * ii) as CellNode));
  }
  return line;
}
