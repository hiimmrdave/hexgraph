import {
  CellNode,
  add,
  multiply,
  DIRECTIONS,
  distance,
  areEqual,
  cells,
  QRSVector,
  makeNode,
  subtract,
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
  source: CellNode,
  direction: QRSVector,
  range: number
): CellNode[] {
  const hexCoords = ["q", "r", "s"],
    toward = subtract(direction, source),
    max = Math.max(Math.abs(toward.q), Math.abs(toward.r), Math.abs(toward.s)),
    cone = [],
    directionCoords = { ia: "", ib: "", ic: "" };
  let directionSign = 0;
  for (const key of hexCoords) {
    if (max === Math.abs(toward[key] as number)) {
      directionSign = max / (toward[key] as number);
      directionCoords.ic = key;
      directionCoords.ia =
        hexCoords[hexCoords.indexOf(directionCoords.ic) + 1] ?? hexCoords[0];
      directionCoords.ib =
        hexCoords[hexCoords.indexOf(directionCoords.ia) + 1] ?? hexCoords[0];
    }
  }
  for (let ia = 0; ia < range; ia++) {
    for (let ib = 0; ib < range - ia; ib++) {
      const ic = -(ia + ib),
        newCell = {
          [directionCoords.ia]: directionSign * ia,
          [directionCoords.ib]: directionSign * ib,
          [directionCoords.ic]: directionSign * ic,
        } as QRSVector;
      cone.push(makeNode(add(source, newCell), "Cell") as CellNode);
    }
  }

  return cone;
}
