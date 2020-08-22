import { HALF_PI, PI_OVER_SIX, SQRT_THREE } from "./math.js";
import { QRSVector, CellNode, vertices } from "./hex.js";

/** a vector or coordinate in 2-space */
export interface XYVector {
  /** the x component of the vector */
  readonly x: number;
  /** the y component of the coordinate/vector */
  readonly y: number;
}

/** a matrix to convert from QRS to XY space */
export interface Orientation {
  f: { q: XYVector; r: XYVector };
  b: { q: XYVector; r: XYVector };
}

/**
 * a set of values to convert from CubeVector grid coordinates to
 * CartesianVector screen coodrinates
 */
export interface LayoutConfig {
  orientation: Orientation;
  radius: XYVector;
  origin: XYVector;
  size: XYVector;
}

/**
 *
 * @param theta the angle from center to point 0, ccw in multiples of pi/12
 * @returns objectified transformation matricies for QRS->XY and XY->QRS
 */
export function orientation(theta = 0): Orientation {
  return {
    f: {
      q: {
        x: Math.cos(theta - PI_OVER_SIX) * SQRT_THREE,
        y: Math.sin(theta + 5 * PI_OVER_SIX) * SQRT_THREE,
      },
      r: {
        x: Math.cos(theta - HALF_PI) * SQRT_THREE,
        y: Math.sin(theta + HALF_PI) * SQRT_THREE,
      },
    },
    b: {
      q: {
        x: (Math.cos(theta) * 2) / 3,
        y: (Math.sin(theta) * -2) / 3,
      },
      r: {
        x: (Math.cos(theta + 2 * PI_OVER_SIX) * -2) / 3,
        y: (Math.sin(theta + 2 * PI_OVER_SIX) * 2) / 3,
      },
    },
  };
}

export function config(
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
  const x = (o.f.q.x * c.q + o.f.r.x * c.r) * radius.x + origin.x,
    y = (o.f.q.y * c.q + o.f.r.y * c.r) * radius.y + origin.y;
  return { x, y };
}

export function pointToCube(
  p: XYVector,
  { orientation: o, radius, origin }: LayoutConfig
): QRSVector {
  const pt = {
      x: (p.x - origin.x) / radius.x,
      y: (p.y - origin.y) / radius.y,
    },
    q = o.b.q.x * pt.x + o.b.q.y * pt.y,
    r = o.b.r.x * pt.x + o.b.r.y * pt.y,
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
  return vertices(cell).map(vertex => cubeToPoint(vertex, layout));
}
