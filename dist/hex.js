import { thousandthRound } from "./math";
export const DIRECTIONS = [
  { q: 1, r: -1, s: 0 },
  { q: 0, r: -1, s: 1 },
  { q: -1, r: 0, s: 1 },
  { q: -1, r: 1, s: 0 },
  { q: 0, r: 1, s: -1 },
  { q: 1, r: 0, s: -1 },
];
export const DIAGONALS = [
  { q: 2, r: -1, s: -1 },
  { q: 1, r: -2, s: 1 },
  { q: -1, r: -1, s: 2 },
  { q: -2, r: 1, s: 1 },
  { q: -1, r: 2, s: -1 },
  { q: 1, r: 1, s: -2 },
];
export function makeNode({ q, r, s }, nodetype) {
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
    case "Cell":
      return result;
    case "Edge":
      return result;
    case "Vertex":
      return result;
    default:
      return result;
  }
}
export function cells(node) {
  switch (node.nodetype) {
    case "Cell":
      return DIRECTIONS.map(e => makeNode(add(node, e), "Cell"));
    case "Edge":
      return DIRECTIONS.map(e =>
        makeNode(add(node, multiply(e, 0.5)), "Cell")
      ).filter(
        e =>
          Number.isInteger(e.q) &&
          Number.isInteger(e.r) &&
          Number.isInteger(e.s)
      );
    case "Vertex":
      return DIAGONALS.map(e =>
        makeNode(add(node, multiply(e, 1 / 3)), "Cell")
      ).filter(
        e =>
          Number.isInteger(e.q) &&
          Number.isInteger(e.r) &&
          Number.isInteger(e.s)
      );
    default:
      return node;
  }
}
export function edges(node) {
  switch (node.nodetype) {
    case "Cell":
      return DIRECTIONS.map(e =>
        makeNode(add(multiply(e, 5e-1), node), "Edge")
      );
    case "Edge":
      return DIRECTIONS.map(e =>
        makeNode(add(node, multiply(e, 0.5)), "Edge")
      ).filter(
        e =>
          !(
            Number.isInteger(e.q) &&
            Number.isInteger(e.r) &&
            Number.isInteger(e.s)
          )
      );
    case "Vertex":
      return DIAGONALS.map(e =>
        makeNode(add(node, multiply(e, 1 / 6)), "Edge")
      ).filter(
        e =>
          Number.isInteger(e.q * 2) &&
          Number.isInteger(e.r * 2) &&
          Number.isInteger(e.s * 2)
      );
    default:
      return node;
  }
}
export function vertices(node) {
  switch (node.nodetype) {
    case "Cell":
      return DIAGONALS.map(e =>
        makeNode(add(node, multiply(e, 1 / 3)), "Vertex")
      );
    case "Edge":
      return DIAGONALS.map(e =>
        makeNode(add(node, multiply(e, 1 / 6)), "Vertex")
      ).filter(
        e =>
          Number.isInteger(e.q * 3) &&
          Number.isInteger(e.r * 3) &&
          Number.isInteger(e.s * 3)
      );
    case "Vertex":
      return DIAGONALS.map(e =>
        makeNode(add(node, multiply(e, 1 / 3)), "Vertex")
      ).filter(
        e =>
          !(
            Number.isInteger(e.q) &&
            Number.isInteger(e.r) &&
            Number.isInteger(e.s)
          )
      );
    default:
      return node;
  }
}
export function areEqual(a, b) {
  return a.q === b.q && a.r === b.r && a.s === b.s && a.nodetype === b.nodetype;
}
export function add(a, b) {
  return { q: a.q + b.q, r: a.r + b.r, s: a.s + b.s };
}
export function subtract(a, b) {
  return { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s };
}
export function multiply(cell, k) {
  return { q: cell.q * k, r: cell.r * k, s: cell.s * k };
}
export function length({ q, r, s }) {
  return Math.max(Math.abs(q), Math.abs(r), Math.abs(s));
}
//# sourceMappingURL=hex.js.map
