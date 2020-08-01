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

export const DIRECTIONS: QRSVector[] = [
  { q: 1, r: -1, s: 0 },
  { q: 0, r: -1, s: 1 },
  { q: -1, r: 0, s: 1 },
  { q: -1, r: 1, s: 0 },
  { q: 0, r: 1, s: -1 },
  { q: 1, r: 0, s: -1 },
];
export const DIAGONALS: QRSVector[] = [
  { q: 2, r: -1, s: -1 },
  { q: 1, r: -2, s: 1 },
  { q: -1, r: -1, s: 2 },
  { q: -2, r: 1, s: 1 },
  { q: -1, r: 2, s: -1 },
  { q: 1, r: 1, s: -2 },
];

/**
 * Creates a HexNode with the specified coordinates and generates properties
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns the node of the specified type at the specified coordinates
 */
export function makeNode({ q, r, s }: QRSVector, nodetype: NodeType): HexNode {
  if (q + r + s > 1e-3) {
    throw new TypeError("q+r+s must sum to zero");
  }
  const result = {
    q,
    r,
    s,
    id: `${thousandthRound(q)},${thousandthRound(r)},${thousandthRound(s)}`,
    links: new WeakSet(),
    nodetype,
  };
  switch (nodetype) {
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
 * @param node - the graph node of which to find adjacent cells
 */
export function cells(node: HexNode): Array<CellNode> {
  switch (node.nodetype) {
    case NodeType.Cell:
      return DIRECTIONS.map(e =>
        makeNode(add(node, e), NodeType.Cell)
      ) as CellNode[];
    case NodeType.Edge:
      return DIRECTIONS.map(e =>
        makeNode(add(node, multiply(e, 0.5)), NodeType.Cell)
      ).filter(
        e =>
          Number.isInteger(e.q) &&
          Number.isInteger(e.r) &&
          Number.isInteger(e.s)
      ) as CellNode[];
    case NodeType.Vertex:
      return DIAGONALS.map(e =>
        makeNode(add(node, multiply(e, 1 / 3)), NodeType.Cell)
      ).filter(
        e =>
          Number.isInteger(e.q) &&
          Number.isInteger(e.r) &&
          Number.isInteger(e.s)
      ) as CellNode[];
    default:
      return node as never;
  }
}

/**
 * @param node - the graph node of which to find adjacent edges
 */
export function edges(node: HexNode): Array<EdgeNode> {
  switch (node.nodetype) {
    case NodeType.Cell:
      return DIRECTIONS.map(e =>
        makeNode(add(multiply(e, 5e-1), node), NodeType.Edge)
      ) as EdgeNode[];
    case NodeType.Edge:
      return DIRECTIONS.map(e =>
        makeNode(add(node, multiply(e, 0.5)), NodeType.Edge)
      ).filter(
        e =>
          !(
            Number.isInteger(e.q) &&
            Number.isInteger(e.r) &&
            Number.isInteger(e.s)
          )
      ) as EdgeNode[];
    case NodeType.Vertex:
      return DIAGONALS.map(e =>
        makeNode(add(node, multiply(e, 1 / 6)), NodeType.Edge)
      ).filter(
        e =>
          Number.isInteger(e.q * 2) &&
          Number.isInteger(e.r * 2) &&
          Number.isInteger(e.s * 2)
      ) as EdgeNode[];
    default:
      return node as never;
  }
}

/**
 * @param node - the graph node of which to find adjacent vertices
 */
export function vertices(node: HexNode): Array<VertexNode> {
  switch (node.nodetype) {
    case NodeType.Cell:
      return DIAGONALS.map(e =>
        makeNode(add(node, multiply(e, 1 / 3)), NodeType.Vertex)
      ) as VertexNode[];
    case NodeType.Edge:
      return DIAGONALS.map(e =>
        makeNode(add(node, multiply(e, 1 / 6)), NodeType.Vertex)
      ).filter(
        e =>
          Number.isInteger(e.q * 3) &&
          Number.isInteger(e.r * 3) &&
          Number.isInteger(e.s * 3)
      ) as VertexNode[];
    case NodeType.Vertex:
      return DIAGONALS.map(e =>
        makeNode(add(node, multiply(e, 1 / 3)), NodeType.Vertex)
      ).filter(
        e =>
          !(
            Number.isInteger(e.q) &&
            Number.isInteger(e.r) &&
            Number.isInteger(e.s)
          )
      ) as VertexNode[];
    default:
      return node as never;
  }
}

/**
 * Two hex nodes are equal if they have equal cube coordinates.
 * @param a - a hex node
 * @param b - a hex node to compare
 * @returns whether a and b have the same coordinates
 */
export function areEqual(a: QRSVector, b: QRSVector): boolean {
  return a.q === b.q && a.r === b.r && a.s === b.s && a.nodetype === b.nodetype;
}

/**
 * The sum of two cube vectors is the sum of their coordinates
 * @param a  - a QRS vector (or Hex Node)
 * @param b - another QRS vector
 */
export function add(a: QRSVector, b: QRSVector): QRSVector {
  return { q: a.q + b.q, r: a.r + b.r, s: a.s + b.s };
}

export function subtract(a: QRSVector, b: QRSVector): QRSVector {
  return { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s };
}

export function multiply(cell: QRSVector, k: number): QRSVector {
  return { q: cell.q * k, r: cell.r * k, s: cell.s * k };
}

export function length({ q, r, s }: QRSVector): number {
  return Math.max(Math.abs(q), Math.abs(r), Math.abs(s));
}
