import * as Hex from "./hex.js";
import { round } from "./cell.js";
import { cubeLerp } from "./math.js";
import { GridMap } from "./grid.js";
import { XYVector } from "./layout.js";

const CELLZERO: Hex.CellNode = Object.freeze(
    Hex.makeNode({ q: 0, r: 0, s: 0 }, "Cell") as Hex.CellNode
  ),
  CELLONE: Hex.CellNode = Object.freeze(
    Hex.makeNode({ q: 2, r: -1, s: -1 }, "Cell") as Hex.CellNode
  ),
  findWedge = function findWedge({
    origin,
    toward,
  }: {
    origin: Hex.CellNode;
    toward: Hex.QRSVector;
  }): {
    dirs: { ia: string; ib: string; ic: string };
    sign: -1 | 1;
  } {
    const hexCoords = ["q", "r", "s"],
      dir = Hex.subtract(toward, origin),
      max = Math.max(Math.abs(dir.q), Math.abs(dir.r), Math.abs(dir.s)),
      directionCoords = { ia: "", ib: "", ic: "" };
    for (const key of hexCoords) {
      if (max === Math.abs(dir[key] as number)) {
        const directionSign: -1 | 1 = -max / (dir[key] as number) > 0 ? 1 : -1;
        directionCoords.ic = key;
        directionCoords.ia =
          hexCoords[hexCoords.indexOf(directionCoords.ic) + 1] ?? hexCoords[0];
        directionCoords.ib =
          hexCoords[hexCoords.indexOf(directionCoords.ia) + 1] ?? hexCoords[0];
        return { dirs: directionCoords, sign: directionSign };
      }
    }
    return null as never;
  };

/**
 * @param start the Cell at the start of the line (inclusive)
 * @param end the Cell at the end of the line (inclusive)
 * @returns a GridMap of the cells along a line
 */
export function line({
  start,
  end,
}: {
  start: Hex.CellNode;
  end: Hex.CellNode;
}): GridMap {
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
 *
 * ! magic number: DIRECTIONS[4]
 *
 * ? why does this work? Why do other indices not?
 * @param origin the center of the ring
 * @param size the number of steps from the center to a cell on the ring
 * @returns an array of CellNodes that are a given radius from the center cell
 */
export function ring({
  origin = CELLZERO,
  size = 1,
}: {
  origin: Hex.CellNode;
  size: XYVector | number;
}): GridMap {
  if (size < 1) return new Map().set(origin.id, origin);
  const ring = new Map();
  if (typeof size === "number") {
    size = { x: size, y: size };
  }
  let ringCell = Hex.makeNode(
    Hex.add(origin, Hex.multiply(Hex.DIRECTIONS[4], size.x)),
    "Cell"
  ) as Hex.CellNode;
  for (let ii = 0; ii < 6; ii++) {
    for (let ij = 0; ij < size.x; ij++) {
      ring.set(ringCell.id, ringCell);
      ringCell = Hex.cells(ringCell)[ii];
    }
  }
  return ring;
}

/**
 * @param origin the CellNode where the cone originates
 * @param toward a QRSVector within the cone
 * @param range the number of cells along a side of the triangle
 */
export function cone({
  origin = CELLZERO,
  toward = CELLONE,
  size = 2,
}: {
  origin: Hex.CellNode;
  toward: Hex.QRSVector;
  size: XYVector | number;
}): GridMap {
  const cone: GridMap = new Map(),
    { dirs, sign } = findWedge({ origin, toward });
  if (typeof size === "number") {
    size = { x: size, y: size };
  }
  for (let ia = 0; ia < size.x; ia++) {
    for (let ib = 0; ib < size.x - ia; ib++) {
      const ic = -(ia + ib),
        newCell = Hex.makeNode(
          Hex.add(
            {
              [dirs.ia]: sign * ia,
              [dirs.ib]: sign * ib,
              [dirs.ic]: sign * ic,
            } as Hex.QRSVector,
            origin
          ),
          "Cell"
        ) as Hex.CellNode;
      cone.set(newCell.id, newCell);
    }
  }
  return cone;
}

/**
 * @param center the center of the hexagon
 * @param size the number of hex cells along each side of the hexagon
 */
export function hexagon({
  origin = CELLZERO,
  size = 2,
}: {
  origin: Hex.CellNode;
  size: XYVector | number;
}): GridMap {
  const hexagon: GridMap = new Map();
  if (typeof size === "number") {
    size = { x: size, y: size };
  }
  for (let ia = -size.x; ia <= size.x; ia++) {
    for (let ib = -size.x; ib <= size.x; ib++) {
      if (Math.abs(ia) + Math.abs(ib) + Math.abs(-ia - ib) < size.x * 2) {
        const ic = -(ia + ib),
          newNode = Hex.makeNode(
            Hex.add(origin, { q: ia, r: ib, s: ic }),
            "Cell"
          ) as Hex.CellNode;
        hexagon.set(newNode.id, newNode);
      }
    }
  }
  return hexagon;
}

/**
 * !document every export
 * @param origin
 * @param toward
 * @param size
 */
export function rhombus({
  origin = CELLZERO,
  toward = CELLONE,
  size = 2,
}: {
  origin: Hex.CellNode;
  toward: Hex.QRSVector;
  size: XYVector | number;
}): GridMap {
  const rhombus: GridMap = new Map(),
    { dirs, sign } = findWedge({ origin, toward });
  if (typeof size === "number") {
    size = { x: size, y: size };
  }
  for (let ia = 0; ia < size.x; ia++) {
    for (let ib = 0; ib < size.y; ib++) {
      const ic = -(ia + ib),
        newCell = Hex.makeNode(
          Hex.add(
            {
              [dirs.ia]: sign * ia,
              [dirs.ib]: sign * ib,
              [dirs.ic]: sign * ic,
            } as Hex.QRSVector,
            origin
          ),
          "Cell"
        ) as Hex.CellNode;
      rhombus.set(newCell.id, newCell);
    }
  }
  return rhombus;
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
