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
  readonly radius: XYVector;
  readonly origin: XYVector;
  readonly size: XYVector;
  readonly cubeToPoint: Matrix2x2;
  readonly pointToCube: Matrix2x2;
};

const QRXY: Matrix2x2 = [
    [3 / 2, 0],
    [SQRT_THREE / 2, SQRT_THREE],
  ],
  /*  XYQR: Matrix2x2 = [
    [2 / 3, 0],
    [-1 / 3, SQRT_THREE / 3],
  ],*/
  Identity2x2: Matrix2x2 = [
    [1, 0],
    [0, 1],
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
    [-scaleX, 0],
    [0, -scaleY],
  ];
}

function invertMatrix2x2([[a, b], [c, d]]: Matrix2x2): Matrix2x2 {
  return [
    [d / (a * d - b * c), b / (b * c - a * c)],
    [c / (b * c - a * c), a / (a * d - b * c)],
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
  return matrices.reduce(
    (acc, cur) => composeMatrices2x2(cur, acc),
    Identity2x2
  );
}

export function configureLayout(
  radius: XYVector,
  origin: XYVector,
  size: XYVector,
  transforms: Matrix2x2[] = []
): LayoutConfig {
  const cubeToPoint = composeMatrixArray([QRXY, ...transforms]),
    pointToCube = invertMatrix2x2(cubeToPoint);
  return {
    radius,
    origin,
    size,
    cubeToPoint,
    pointToCube,
  };
}

export function cubeToPoint(
  c: QRSVector,
  { radius, origin, cubeToPoint: M }: LayoutConfig
): XYVector {
  const x =
      thousandthRound(M[0][0] * c.q + M[0][1] * c.r) * radius.x + origin.x,
    y = thousandthRound(M[1][0] * c.q + M[1][1] * c.r) * radius.y + origin.y;
  return { x, y };
}

export function pointToCube(
  p: XYVector,
  { radius, origin, pointToCube: M }: LayoutConfig
): QRSVector {
  const pt = {
      x: (p.x - origin.x) / radius.x,
      y: (p.y - origin.y) / radius.y,
    },
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
