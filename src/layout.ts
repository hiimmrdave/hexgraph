/**
 * provides methods for projecting a QRS grid into cartesian space
 */
import { PI_OVER_SIX, SQRT_THREE, thousandthRound } from "./math.js";
import { QRSVector, CellNode, vertices } from "./hex.js";

/** a vector or coordinate in 2-space */
export type XYVector = {
  /** the x component of the vector */
  readonly x: number;
  /** the y component of the coordinate/vector */
  readonly y: number;
};

/** a matrix to convert between QRS and XY space */
type TransformMatrix = {
  f: [number, number, number, number];
  b: [number, number, number, number];
};

/**
 * a set of values to convert from CubeVector grid coordinates to
 * CartesianVector screen coodrinates
 */
export type LayoutConfig = {
  cO: TransformMatrix;
  radius: XYVector;
  origin: XYVector;
  size: XYVector;
};

function cellOrientationMatrixer(theta = 0): TransformMatrix {
  return {
    f: [
      Math.cos(theta - PI_OVER_SIX) * SQRT_THREE,
      Math.sin(theta) * SQRT_THREE,
      -Math.sin(theta - PI_OVER_SIX) * SQRT_THREE,
      Math.cos(theta) * SQRT_THREE,
    ],
    b: [
      Math.cos(theta) * (2 / 3),
      -Math.sin(theta) * (2 / 3),
      Math.sin(theta - PI_OVER_SIX) * (2 / 3),
      Math.cos(theta - PI_OVER_SIX) * (2 / 3),
    ],
  };
}

export function configureLayout(
  cellTheta: number,
  radius: XYVector,
  origin: XYVector,
  size: XYVector
): LayoutConfig {
  const cO = cellOrientationMatrixer(cellTheta);
  return { cO, radius, origin, size };
}

export function cubeToPoint(
  c: QRSVector,
  { cO, radius, origin }: LayoutConfig
): XYVector {
  const x = (cO.f[0] * c.q + cO.f[1] * c.r) * radius.x + origin.x,
    y = (cO.f[2] * c.q + cO.f[3] * c.r) * radius.y + origin.y;
  return { x: thousandthRound(x), y: thousandthRound(y) };
}

export function pointToCube(
  p: XYVector,
  { cO, radius, origin }: LayoutConfig
): QRSVector {
  const pt = {
      x: (p.x - origin.x) / radius.x,
      y: (p.y - origin.y) / radius.y,
    },
    q = cO.b[0] * pt.x + cO.b[1] * pt.y,
    r = cO.b[2] * pt.x + cO.b[3] * pt.y,
    s = -q - r;
  return { q, r, s };
}

export function cellPoints({
  cell,
  layout,
}: {
  cell: CellNode;
  layout: LayoutConfig;
}): XYVector[] {
  return vertices(cell).map((vertex) => cubeToPoint(vertex, layout));
}
