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
import {
  QRSVector,
  HexNode,
  NodeType,
  CellNode,
  EdgeNode,
  VertexNode,
} from "./types";
import { thousandthRound } from "./math";
//#endregion type descriptions

/**
 * this is used by makeCell, makeEdge, makeVertex to generate
 * the common and coordinate-based properties of the node
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns the node of the specified type at the specified coordinates
 */
export function makeNode({ q, r, s }: QRSVector, kind: NodeType): HexNode {
  if (q + r + s > 1e-3) {
    throw new TypeError("q+r+s must sum to zero");
  }
  let result = {
    q,
    r,
    s,
    id: `${thousandthRound(q)},${thousandthRound(r)},${thousandthRound(s)}`,
    links: new WeakSet(),
    nodetype: kind,
  };
  switch (kind) {
    case NodeType.Cell:
      return result as CellNode;
    case NodeType.Edge:
      return result as EdgeNode;
    case NodeType.Vertex:
      return result as VertexNode;
    default:
      return result as never;
  }
}

/**
 * Two hex nodes are equal if they have equal cube coordinates.
 * @param a - a hex node
 * @param b - a hex node to compare
 * @returns whether a and b have the same coordinates
 */
export function areEqual(a: Partial<HexNode>, b: Partial<HexNode>): boolean {
  return a.q === b.q && a.r === b.r && a.s === b.s && a.nodetype === b.nodetype;
}

export function add(a: QRSVector | HexNode, b: QRSVector): QRSVector {
  return { q: a.q + b.q, r: a.r + b.r, s: a.s + b.s };
}

export function subtract(a: QRSVector | HexNode, b: QRSVector): QRSVector {
  return { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s };
}

export function multiply(cell: QRSVector | HexNode, k: number): QRSVector {
  return { q: cell.q * k, r: cell.r * k, s: cell.s * k };
}

export function length({ q, r, s }: QRSVector): number {
  return Math.max(Math.abs(q), Math.abs(r), Math.abs(s));
}
