import * as Hex from "./hex.js";
import { round } from "./cell.js";
import { cubeLerp } from "./math.js";
import { GridMap, TwoSize } from "./grid.js";

interface SubsetMakerParameters {
  origin?: Hex.CellNode;
  toward?: Hex.QRSVector;
  size?: number | TwoSize;
}

const CELLZERO: Hex.CellNode = Object.freeze(
    Hex.makeNode({ q: 0, r: 0, s: 0 }, "Cell") as Hex.CellNode
  ),
  CELLONE: Hex.CellNode = Object.freeze(
    Hex.makeNode({ q: 2, r: -1, s: -1 }, "Cell") as Hex.CellNode
  ),
  makeTwoSize = function xySize(size: number | TwoSize): TwoSize {
    if (typeof size === "number") {
      return { a: size, b: size };
    }
    return size;
  },
  findWedge = function findWedge({
    origin = CELLZERO,
    toward = CELLONE,
  }: SubsetMakerParameters): {
    dirs: { ia: "q" | "r" | "s"; ib: "q" | "r" | "s"; ic: "q" | "r" | "s" };
    sign: -1 | 1;
  } {
    const hexCoords: ("q" | "r" | "s")[] = ["q", "r", "s"],
      dir = Hex.subtract(toward, origin),
      max = Math.max(Math.abs(dir.q), Math.abs(dir.r), Math.abs(dir.s));
    for (const coord of hexCoords) {
      if (max === Math.abs(dir[coord])) {
        const directionSign: -1 | 1 = -max / dir[coord] > 0 ? 1 : -1,
          directionCoords = Object.fromEntries(
            [
              ...hexCoords.slice(hexCoords.indexOf(coord)),
              ...hexCoords.slice(0, hexCoords.indexOf(coord)),
            ].map((e, i) => [["ic", "ia", "ib"][i], e])
          ) as Record<"ia" | "ib" | "ic", "q" | "r" | "s">;
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
  origin = CELLZERO,
  toward = CELLONE,
}: SubsetMakerParameters): GridMap {
  if (Hex.areEqual(origin, toward)) return new Map().set(origin.id, origin);
  const t = Hex.distance(origin, toward);
  const line = new Map();
  for (let ii = 0; ii <= t; ii++) {
    const newCell: Hex.CellNode = round(
      cubeLerp(origin, toward, (1 / t) * ii) as Hex.CellNode
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
  size = 2,
}: SubsetMakerParameters): GridMap {
  size = makeTwoSize(size);
  if (size.a < 1) return new Map().set(origin.id, origin);
  const ring = new Map();
  let ringCell = Hex.makeNode(
    Hex.add(origin, Hex.multiply(Hex.DIRECTIONS[4], size.a)),
    "Cell"
  ) as Hex.CellNode;
  for (let ii = 0; ii < 6; ii++) {
    for (let ij = 0; ij < size.a; ij++) {
      ring.set(ringCell.id, ringCell);
      ringCell = Hex.cells(ringCell)[ii];
    }
  }
  return ring;
}

/**
 * @param origin the CellNode where the cone originates
 * @param toward a QRSVector within the cone
 * @param size the number of cells along a side of the triangle
 */
export function cone({
  origin = CELLZERO,
  toward = CELLONE,
  size = 4,
}: SubsetMakerParameters): GridMap {
  const cone: GridMap = new Map(),
    { dirs, sign } = findWedge({ origin, toward });
  size = makeTwoSize(size);
  for (let ia = 0; ia < size.a; ia++) {
    for (let ib = 0; ib < size.a - ia; ib++) {
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
}: SubsetMakerParameters): GridMap {
  const hexagon: GridMap = new Map();
  size = makeTwoSize(size);
  for (let ia = -size.a; ia <= size.a; ia++) {
    for (let ib = -size.a; ib <= size.a; ib++) {
      if (Math.abs(ia) + Math.abs(ib) + Math.abs(-ia - ib) < size.a * 2) {
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
 * @param origin cell forming one of the acute angles of the rhombus
 * @param toward a qrs vector within the desired rhombus "wedge"
 * @param size the number of cells along one edge of the rhombus
 */
export function rhombus({
  origin = CELLZERO,
  toward = CELLONE,
  size = 2,
}: SubsetMakerParameters): GridMap {
  const rhombus: GridMap = new Map(),
    { dirs, sign } = findWedge({ origin, toward });
  size = makeTwoSize(size);
  for (let ia = 0; ia < size.a; ia++) {
    for (let ib = 0; ib < size.b; ib++) {
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
