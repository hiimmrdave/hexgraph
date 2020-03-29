/**
 * imports and exports the various functions
 * @packageDocumentation
/*
 * graph vertices are called "nodes"
 * graph edges are called "links"
 * this is to remove ambiguity with the related grid terms
 * ⬢⬣
 */

//#region type setup
import { CubeVector, HexNode, QRS } from "./types.js";
import * as Cell from "./cell.js";
import * as Edge from "./edge.js";
import * as hexmath from "./math.js";
//#endregion type descriptions

/**
 * this is used by makeCell, makeEdge, makeVertex to generate
 * the common and coordinate-based properties of the node
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns a HexNode object
 */
export function makeNode({ q, r, s }: CubeVector): HexNode {
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

/**
 * Two hex nodes are equal if they have equal cube coordinates.
 * @param a - a hex node
 * @param b - a hex node to compare
 * @returns whether a and b have the same coordinates
 */
export function areEqual(a: QRS, b: QRS): boolean {
  return (a.q === b.q && a.r === b.r && a.s === b.s);
}

console.log(Cell.makeCell({q:0,r:0,s:0}))