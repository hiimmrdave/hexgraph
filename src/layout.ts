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

/**
 * a set of values to convert from CubeVector grid coordinates to
 * CartesianVector screen coodrinates
 */
export type LayoutConfig = {
  readonly origin: XYVector;
  readonly size: XYVector;
  readonly cubeToPoint: Matrix2x2;
  readonly pointToCube: Matrix2x2;
};

const QRXY: Matrix2x2 = [
    [3 / 2, 0],
    [SQRT_THREE / 2, SQRT_THREE],
  ],
  IDENTITY2: Matrix2x2 = [
    [1, 0],
    [0, 1],
  ],
  SIXTH_SCALE: Matrix2x2 = [
    [1 / 6, 0],
    [0, 1 / 6],
  ];

export function rotateTransform(theta: number): Matrix2x2 {
  return [
    [Math.cos(theta) + 0, -Math.sin(theta) + 0],
    [Math.sin(theta) + 0, Math.cos(theta) + 0],
  ];
}

export function shearTransform(shearX: number, shearY: number): Matrix2x2 {
  return [
    [1, -shearX],
    [-shearY, 1],
  ];
}

export function scaleTransform(scaleX: number, scaleY: number): Matrix2x2 {
  return [
    [scaleX, 0],
    [0, scaleY],
  ];
}

function invertMatrix2x2([[a, b], [c, d]]: Matrix2x2): Matrix2x2 {
  return [
    [d / (a * d - b * c), b / (b * c - a * d)],
    [c / (b * c - a * d), a / (a * d - b * c)],
  ];
}

function composeMatrices2x2(
  [[a, b], [c, d]]: Matrix2x2,
  [[e, f], [g, h]]: Matrix2x2
): Matrix2x2 {
  return [
    [a * e + b * g, a * f + b * h],
    [c * e + d * g, c * f + d * h],
  ];
}

function composeMatrixArray(matrices: Matrix2x2[]): Matrix2x2 {
  return matrices.reduce((acc, cur) => composeMatrices2x2(cur, acc), IDENTITY2);
}

export function configureLayout(
  origin: XYVector,
  size: XYVector,
  transforms: Matrix2x2[] = []
): LayoutConfig {
  const cubeToPoint = composeMatrixArray([QRXY, SIXTH_SCALE, ...transforms]),
    pointToCube = invertMatrix2x2(cubeToPoint);
  return {
    origin,
    size,
    cubeToPoint,
    pointToCube,
  };
}

export function cubeToPoint(
  c: QRSVector,
  { origin, cubeToPoint: M }: LayoutConfig
): XYVector {
  const x = thousandthRound(M[0][0] * c.q + M[0][1] * c.r + origin.x),
    y = thousandthRound(M[1][0] * c.q + M[1][1] * c.r + origin.y);
  return { x, y };
}

export function pointToCube(
  p: XYVector,
  { origin, pointToCube: M }: LayoutConfig
): QRSVector {
  const pt = { x: p.x - origin.x, y: p.y - origin.y },
    q = M[0][0] * pt.x + M[0][1] * pt.y,
    r = M[1][0] * pt.x + M[1][1] * pt.y,
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
