/**
 * ⬢⬣
 */

import { thousandthRound } from "./math.js";

/**
 * the type of node of the hex graph, corresponding to which portion of the hex
 * grid the node represents
 */
export type NodeType = "Cell" | "Edge" | "Vertex";

/**
 * a vector or coordinate in qrs space. qrs is cubic space, which is confined
 * here to a plane q+r+s==0
 */
export type QRSVector = {
  [key in "q" | "r" | "s"]: number;
};

/** a node of the graph representation of the hexagonal grid */
export interface HexNode extends QRSVector {
  /** the cube coordinates of the node as a comma-separated string */
  id: `${number},${number},${number}`;
  /** the set of nodes adjacent to this node. "Adjacency" is arbitrary. */
  links: WeakSet<HexNode>;
  /** arbitrary additional properties */
  [prop: string]: unknown;
}

/** a Cell node of the hexagonal grid */
export interface CellNode extends HexNode {
  /** the discriminant of the HexNode */
  kind: "Cell";
}

/** an Edge node of the hexagonal grid */
export interface EdgeNode extends HexNode {
  /** the discriminant of the HexNode */
  kind: "Edge";
}

/** a Vertex node of the hexagonal grid */
export interface VertexNode extends HexNode {
  /** the discriminant of the HexNode */
  kind: "Vertex";
}

/**
 * the coordinates of the cells sharing an edge and two vertices with the origin
 */
export const DIRECTIONS: QRSVector[] = [
  { q: 6, r: -6, s: 0 },
  { q: 0, r: -6, s: 6 },
  { q: -6, r: 0, s: 6 },
  { q: -6, r: 6, s: 0 },
  { q: 0, r: 6, s: -6 },
  { q: 6, r: 0, s: -6 },
];
/**
 * the coordinates of cells that share an edge only with the origin
 */
export const DIAGONALS: QRSVector[] = [
  { q: 12, r: -6, s: -6 },
  { q: 6, r: -12, s: 6 },
  { q: -6, r: -6, s: 12 },
  { q: -12, r: 6, s: 6 },
  { q: -6, r: 12, s: -6 },
  { q: 6, r: 6, s: -12 },
];

/**
 * Creates a HexNode with the specified coordinates and generates properties
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns the node of the specified type at the specified coordinates
 */
export function makeNode({ q, r, s }: QRSVector, kind: NodeType): HexNode {
  if (q + r + s > 1e-3) {
    throw new TypeError("q+r+s must sum to zero");
  }
  const result = {
    q,
    r,
    s,
    id: `${thousandthRound(q)},${thousandthRound(r)},${thousandthRound(s)}`,
    links: new WeakSet(),
    kind,
  };
  switch (kind) {
    case "Cell":
      return result as CellNode;
    case "Edge":
      return result as EdgeNode;
    case "Vertex":
      return result as VertexNode;
    default:
      return result as never;
  }
}

/**
 * @param node - the graph node of which to find adjacent cells
 */
export function cells(node: HexNode): CellNode[] {
  switch (node.kind) {
    case "Cell":
      return DIRECTIONS.map((e) =>
        makeNode(add(node, e), "Cell")
      ) as CellNode[];
    case "Edge":
      return DIRECTIONS.map((e) =>
        makeNode(add(node, multiply(e, 0.5)), "Cell")
      ).filter(
        (e) =>
          Number.isInteger(e.q) &&
          Number.isInteger(e.r) &&
          Number.isInteger(e.s)
      ) as CellNode[];
    case "Vertex":
      return DIAGONALS.map((e) =>
        makeNode(add(node, multiply(e, 1 / 3)), "Cell")
      ).filter(
        (e) =>
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
export function edges(node: HexNode): EdgeNode[] {
  switch (node.kind) {
    case "Cell":
      return DIRECTIONS.map((e) =>
        makeNode(add(multiply(e, 5e-1), node), "Edge")
      ) as EdgeNode[];
    case "Edge":
      return DIRECTIONS.map((e) =>
        makeNode(add(node, multiply(e, 0.5)), "Edge")
      ).filter(
        (e) =>
          !(
            Number.isInteger(e.q) &&
            Number.isInteger(e.r) &&
            Number.isInteger(e.s)
          )
      ) as EdgeNode[];
    case "Vertex":
      return DIAGONALS.map((e) =>
        makeNode(add(node, multiply(e, 1 / 6)), "Edge")
      ).filter(
        (e) =>
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
export function vertices(node: HexNode): VertexNode[] {
  switch (node.kind) {
    case "Cell":
      return DIAGONALS.map((e) =>
        makeNode(add(node, multiply(e, 1 / 3)), "Vertex")
      ) as VertexNode[];
    case "Edge":
      return DIAGONALS.map((e) =>
        makeNode(add(node, multiply(e, 1 / 6)), "Vertex")
      ).filter(
        (e) =>
          Number.isInteger(e.q * 3) &&
          Number.isInteger(e.r * 3) &&
          Number.isInteger(e.s * 3)
      ) as VertexNode[];
    case "Vertex":
      return DIAGONALS.map((e) =>
        makeNode(add(node, multiply(e, 1 / 3)), "Vertex")
      ).filter(
        (e) =>
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
  return a.q === b.q && a.r === b.r && a.s === b.s;
}

/**
 * The sum of two cube vectors is the sum of their coordinates
 * @param a  - a QRS vector (or Hex Node)
 * @param b - another QRS vector
 */
export function add(a: QRSVector, b: QRSVector): QRSVector {
  return { q: a.q + b.q, r: a.r + b.r, s: a.s + b.s };
}

/**
 * ! explain every export */
export function subtract(a: QRSVector, b: QRSVector): QRSVector {
  return { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s };
}

/**
 * ! explain every export */
export function multiply(cell: QRSVector, k: number): QRSVector {
  return { q: cell.q * k, r: cell.r * k, s: cell.s * k };
}

/**
 * ! explain every export */
export function length({ q, r, s }: QRSVector): number {
  return Math.max(Math.abs(q), Math.abs(r), Math.abs(s));
}

/**
 * ! explain every export */
export function distance(a: QRSVector, b: QRSVector): number {
  return length(subtract(a, b));
}
