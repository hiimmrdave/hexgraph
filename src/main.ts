/**
 * * graph vertices are called "nodes"
 * * graph edges are called "links"
 * this is to remove ambiguity with the related grid terms
 * * ⬢⬣
 */

//#region type setup
import { NodeType, CubeVector, GridShape, CartesianVector } from "./types";
//#endregion type descriptions

//#region hexagon magic
export const
  PI_OVER_THREE = Math.PI / 3,
  SQRT_THREE = Math.sqrt(3);
//#endregion magic math that is useful for hexagonal graphs

export function makeNode({ q, r, s }: CubeVector): CubeVector {
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

export function areEqual(a: CubeVector, b: CubeVector): boolean {
  return (a.q === b.q && a.r === b.r && a.s === b.s);
}
