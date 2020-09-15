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
type Orientation = {
  f: [number, number, number, number];
  b: [number, number, number, number];
};

/**
 * a set of values to convert from CubeVector grid coordinates to
 * CartesianVector screen coodrinates
 */
export type LayoutConfig = {
  orientation: Orientation;
  radius: XYVector;
  origin: XYVector;
  size: XYVector;
};

/**
 *
 * @param theta the angle from center to point 0, ccw in multiples of pi/12
 * @returns objectified transformation matricies for QRS->XY and XY->QRS
 */
export function orientation(theta = 0): Orientation {
  return {
    f: [
      Math.cos(theta - PI_OVER_SIX) * SQRT_THREE,
      Math.sin(theta) * SQRT_THREE,
      -Math.sin(theta - PI_OVER_SIX) * SQRT_THREE,
      Math.cos(theta) * SQRT_THREE,
    ],
    b: [
      Math.cos(theta) * (2 / 3),
      Math.sin(theta - PI_OVER_SIX) * (2 / 3),
      -Math.sin(theta) * (2 / 3),
      Math.cos(theta - PI_OVER_SIX) * (2 / 3),
    ],
  };
}

export function configureLayout(
  theta: number,
  radius: XYVector,
  origin: XYVector,
  size: XYVector
): LayoutConfig {
  return { orientation: orientation(theta), radius, origin, size };
}

export function cubeToPoint(
  c: QRSVector,
  { orientation: o, radius, origin }: LayoutConfig
): XYVector {
  const x = (o.f[0] * c.q + o.f[1] * c.r) * radius.x + origin.x,
    y = (o.f[2] * c.q + o.f[3] * c.r) * radius.y + origin.y;
  return { x: thousandthRound(x), y: thousandthRound(y) };
}

export function pointToCube(
  p: XYVector,
  { orientation: o, radius, origin }: LayoutConfig
): QRSVector {
  const pt = {
      x: (p.x - origin.x) / radius.x,
      y: (p.y - origin.y) / radius.y,
    },
    q = o.b[0] * pt.x + o.b[1] * pt.y,
    r = o.b[2] * pt.x + o.b[3] * pt.y,
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
