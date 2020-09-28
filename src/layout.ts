/**
 * provides methods for projecting a QRS grid into cartesian space
 */
import { SQRT_THREE, thousandthRound } from "./math.js";
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
  radius: XYVector;
  origin: XYVector;
  size: XYVector;
};

const qrxy: TransformMatrix = {
  f: [3 / 2, 0, SQRT_THREE / 2, SQRT_THREE],
  b: [2 / 3, 0, -1 / 3, SQRT_THREE / 3],
};

export function configureLayout(
  radius: XYVector,
  origin: XYVector,
  size: XYVector
): LayoutConfig {
  return { radius, origin, size };
}

export function cubeToPoint(
  c: QRSVector,
  { radius, origin }: LayoutConfig
): XYVector {
  const x = (qrxy.f[0] * c.q + qrxy.f[1] * c.r) * radius.x + origin.x,
    y = (qrxy.f[2] * c.q + qrxy.f[3] * c.r) * radius.y + origin.y;
  return { x: thousandthRound(x), y: thousandthRound(y) };
}

export function pointToCube(
  p: XYVector,
  { radius, origin }: LayoutConfig
): QRSVector {
  const pt = {
      x: (p.x - origin.x) / radius.x,
      y: (p.y - origin.y) / radius.y,
    },
    q = qrxy.b[0] * pt.x + qrxy.b[1] * pt.y,
    r = qrxy.b[2] * pt.x + qrxy.b[3] * pt.y,
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
