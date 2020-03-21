/**
 **graph vertices are called "nodes"
 **graph edges are called "links"
 * this is to remove ambiguity with the related grid terms
 **⬢⬣
 */

//#region Math
function thousandthRound(n: number): string {
  return n.toFixed(3);
}

function lerp(m: number, n: number, t: number): number {
  return m * (1 - t) + n * t;
}
//#endregion a few mathematical functions that are repeatedly useful

//#region type setup
interface CubeVector {
  readonly q: number;
  readonly r: number;
  readonly s: number;
  readonly type?: NodeType
  [prop: string]: any;
}

interface CartesianVector {
  readonly x: number;
  readonly y: number;
}

const enum NodeType {
  Cell,
  Edge,
  Vertex,
}

const enum GridShape {
  Hexagon,
  Triangle,
  Star,
  Parallelogram,
}
//#endregion type descriptions

//#region hexagon magic
const
  DIRECTIONS: CubeVector[] = [
    { q: 1, r: 0, s: -1 },
    { q: 1, r: -1, s: 0 },
    { q: 0, r: -1, s: 1 },
    { q: -1, r: 0, s: 1 },
    { q: -1, r: 1, s: 0 },
    { q: 0, r: 1, s: -1 }
  ],
  DIAGONALS: CubeVector[] = [
    { q: 2, r: -1, s: -1 },
    { q: 1, r: -2, s: 1 },
    { q: -1, r: -1, s: 2 },
    { q: -2, r: 1, s: 1 },
    { q: -1, r: 2, s: -1 },
    { q: 1, r: 1, s: -2 }
  ],
  PI_OVER_THREE = Math.PI / 3,
  SQRT_THREE = Math.sqrt(3);
//#endregion magic math that is useful for hexagonal graphs

const makeNode = ({ q, r, s }: CubeVector): CubeVector => {
  const self = {
    q,
    r,
    s,
    id: `${q},${r},${s}`,
    links: new WeakSet(),
  }
  if (q + r + s !== 0) { throw new TypeError("q+r+s must sum to zero") }
  return self;
};

const
  Cell = {
    add: (a: CubeVector, b: CubeVector): CubeVector =>
      ({ q: a.q + b.q, r: a.r + b.r, s: a.s + b.s }),
    subtract: (a: CubeVector, b: CubeVector): CubeVector =>
      ({ q: a.q - b.q, r: a.r - b.r, s: a.s - b.s }),
    multiply: (cell: CubeVector, k: number): CubeVector =>
      ({ q: cell.q * k, r: cell.r * k, s: cell.s * k }),
    round: ({ q, r, s }: CubeVector): CubeVector => {
      const
        approx = {
          q: Math.round(q),
          r: Math.round(r),
          s: Math.round(s)
        },
        offset = {
          q: Math.abs(q - approx.q),
          r: Math.abs(r - approx.r),
          s: Math.abs(s - approx.s)
        };
      if (offset.q > offset.r && offset.q > offset.s) {
        approx.q = -1 * approx.r - approx.s;
      } else if (offset.r > offset.s) {
        approx.r = -1 * approx.q - approx.s;
      } else {
        approx.s = -1 * approx.q - approx.r;
      }
      return approx;
    },
    cellLerp: (a: CubeVector, b: CubeVector, t: number): CubeVector =>
      ({ q: lerp(a.q, b.q, t), r: lerp(a.q, b.q, t), s: lerp(a.q, b.q, t) }),
    cells: (cell: CubeVector): CubeVector[] =>
      DIRECTIONS.map((e) => Cell.add(cell, e)),
  },
  Edge = {},
  Vertex = {}

function areEqual(a: CubeVector, b: CubeVector): boolean {
  return (a.q === b.q && a.r === b.r && a.s === b.s);
}

const makeCell = ({ q, r, s }: CubeVector): CubeVector => {
  return Object.assign(makeNode({ q, r, s }), { type: NodeType.Cell })
}

const makeVertex = ({ q, r, s }: CubeVector): CubeVector => {
  return Object.assign(makeNode({ q, r, s }), { type: NodeType.Vertex })
}

const makeEdge = ({ q, r, s }: CubeVector): CubeVector => {
  return Object.assign(makeNode({ q, r, s }), { type: NodeType.Edge })
}