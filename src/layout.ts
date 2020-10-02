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

/** a 2x2 matrix */
type Matrix2x2 = [[number, number], [number, number]];
/** a matrix to convert between QRS and XY space */
type TransformMatrix = {
  f: Matrix2x2;
  b: Matrix2x2;
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
  f: [
    [3 / 2, 0],
    [SQRT_THREE / 2, SQRT_THREE],
  ],
  b: [
    [2 / 3, 0],
    [-1 / 3, SQRT_THREE / 3],
  ],
};

export function rotate(theta: number): TransformMatrix {
  return {
    f: [
      [Math.cos(theta), -Math.sin(theta) + 0],
      [Math.sin(theta), Math.cos(theta)],
    ],
    b: [
      [Math.cos(theta), Math.sin(theta)],
      [-Math.sin(theta) + 0, Math.cos(theta)],
    ],
  };
}

function invertMatrix([[A, B], [C, D]]: Matrix2x2): Matrix2x2 {
  return [
    [D / (A * D - B * C), B / (B * C - A * C)],
    [C / (B * C - A * C), A / (A * D - B * C)],
  ];
}

function composeMatrices(
  { f: [[A, B], [C, D]] }: TransformMatrix,
  { f: [[E, F], [G, H]] }: TransformMatrix
): TransformMatrix {
  return {
    f: [
      [A * E + B * G, A * F + B * H],
      [C * E + D * G, C * F + D * H],
    ],
    b: invertMatrix([
      [A * E + B * G, A * F + B * H],
      [C * E + D * G, C * F + D * H],
    ]),
  };
}

console.log(composeMatrices(qrxy, rotate(Math.PI / 2)));

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
  const x = (qrxy.f[0][0] * c.q + qrxy.f[0][1] * c.r) * radius.x + origin.x,
    y = (qrxy.f[1][0] * c.q + qrxy.f[1][1] * c.r) * radius.y + origin.y;
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
    q = qrxy.b[0][0] * pt.x + qrxy.b[0][1] * pt.y,
    r = qrxy.b[1][0] * pt.x + qrxy.b[1][1] * pt.y,
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
