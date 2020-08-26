import * as Hex from "./hex.js";
import { round } from "./cell.js";
import { cubeLerp } from "./math.js";
import { GridMap } from "./grid.js";

/**
 * @param center the center of the ring
 * @param radius the number of steps from the center to a cell on the ring
 * @returns an array of CellNodes that are a given radius from the center cell
 * ! magic number DIRECTIONS[4] -- why does this work?
 */
export function ring(center: Hex.CellNode, radius: number): GridMap {
  if (radius < 1) return new Map().set(center.id, center);
  const ring = new Map();
  let ringCell = Hex.makeNode(
    Hex.add(center, Hex.multiply(Hex.DIRECTIONS[4], radius)),
    "Cell"
  ) as Hex.CellNode;
  for (let ii = 0; ii < 6; ii++) {
    for (let ij = 0; ij < radius; ij++) {
      ring.set(ringCell.id, ringCell);
      ringCell = Hex.cells(ringCell)[ii];
    }
  }
  return ring;
}

/**
 * @param start the Cell at the start of the line (inclusive)
 * @param end the Cell at the end of the line (inclusive)
 * @returns an array of the cells along a line
 */
export function line(start: Hex.CellNode, end: Hex.CellNode): GridMap {
  if (Hex.areEqual(start, end)) return new Map().set(start.id, start);
  const t = Hex.distance(start, end);
  const line = new Map();
  for (let ii = 0; ii <= t; ii++) {
    const newCell: Hex.CellNode = round(
      cubeLerp(start, end, (1 / t) * ii) as Hex.CellNode
    );
    line.set(newCell.id, newCell);
  }
  return line;
}

/**
 * @param source the CellNode where the cone originates
 * @param direction a QRSVector within the cone
 * @param range how far the cone projects
 */
export function cone(
  source: Hex.CellNode,
  direction: Hex.QRSVector,
  range: number
): GridMap {
  const hexCoords = ["q", "r", "s"],
    toward = Hex.subtract(direction, source),
    max = Math.max(Math.abs(toward.q), Math.abs(toward.r), Math.abs(toward.s)),
    cone: GridMap = new Map(),
    directionCoords = { ia: "", ib: "", ic: "" };
  let directionSign = 0;
  for (const key of hexCoords) {
    if (max === Math.abs(toward[key] as number)) {
      directionSign = -max / (toward[key] as number);
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
        newCell = Hex.makeNode(
          Hex.add(
            {
              [directionCoords.ia]: directionSign * ia,
              [directionCoords.ib]: directionSign * ib,
              [directionCoords.ic]: directionSign * ic,
            } as Hex.QRSVector,
            source
          ),
          "Cell"
        ) as Hex.CellNode;
      cone.set(newCell.id, newCell);
    }
  }
  //* cone.delete(source.id);
  return cone;
}

//! every export needs documentation
export function hexagon(center: Hex.CellNode, size: number): GridMap {
  const hexagon: GridMap = new Map();
  for (let ia = -size; ia <= size; ia++) {
    for (let ib = -size; ib <= size; ib++) {
      if (Math.abs(ia) + Math.abs(ib) + Math.abs(-ia - ib) < size * 2) {
        const ic = -(ia + ib),
          newNode = Hex.makeNode(
            Hex.add(center, { q: ia, r: ib, s: ic }),
            "Cell"
          ) as Hex.CellNode;
        hexagon.set(newNode.id, newNode);
      }
    }
  }
  return hexagon;
}

/**
 * @param a a GridMap
 * @param b a GridMap
 * @returns the set of HexNodes contained in both GridMaps
 */
export function intersection(a: GridMap, b: GridMap): GridMap {
  const intersection: GridMap = new Map();
  for (const [key, val] of a) {
    if (b.has(key) && Hex.areEqual(b.get(key) as Hex.HexNode, val)) {
      intersection.set(key, val);
    }
  }
  return intersection;
}
