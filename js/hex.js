import { thousandthRound as e } from "./math.js";
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
export function makeNode({ q: r, r: t, s: s }, n) {
  if (r + t + s > 0.001) throw new TypeError("q+r+s must sum to zero");
  const u = { q: r, r: t, s: s, id: `${e(r)},${e(t)},${e(s)}`, links: new WeakSet(), kind: n };
  return u;
}
export function cells(e) {
  switch (e.kind) {
    case "Cell":
      return DIRECTIONS.map((r) => makeNode(add(e, r), "Cell"));
    case "Edge":
      return DIRECTIONS.map((r) => makeNode(add(e, multiply(r, 0.5)), "Cell")).filter(
        (e) => Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s)
      );
    case "Vertex":
      return DIAGONALS.map((r) => makeNode(add(e, multiply(r, 1 / 3)), "Cell")).filter(
        (e) => Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s)
      );
    default:
      return e;
  }
}
export function edges(e) {
  switch (e.kind) {
    case "Cell":
      return DIRECTIONS.map((r) => makeNode(add(multiply(r, 0.5), e), "Edge"));
    case "Edge":
      return DIRECTIONS.map((r) => makeNode(add(e, multiply(r, 0.5)), "Edge")).filter(
        (e) => !(Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s))
      );
    case "Vertex":
      return DIAGONALS.map((r) => makeNode(add(e, multiply(r, 1 / 6)), "Edge")).filter(
        (e) => Number.isInteger(2 * e.q) && Number.isInteger(2 * e.r) && Number.isInteger(2 * e.s)
      );
    default:
      return e;
  }
}
export function vertices(e) {
  switch (e.kind) {
    case "Cell":
      return DIAGONALS.map((r) => makeNode(add(e, multiply(r, 1 / 3)), "Vertex"));
    case "Edge":
      return DIAGONALS.map((r) => makeNode(add(e, multiply(r, 1 / 6)), "Vertex")).filter(
        (e) => Number.isInteger(3 * e.q) && Number.isInteger(3 * e.r) && Number.isInteger(3 * e.s)
      );
    case "Vertex":
      return DIAGONALS.map((r) => makeNode(add(e, multiply(r, 1 / 3)), "Vertex")).filter(
        (e) => !(Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s))
      );
    default:
      return e;
  }
}
export function areEqual(e, r) {
  return e.q === r.q && e.r === r.r && e.s === r.s;
}
export function add(e, r) {
  return { q: e.q + r.q, r: e.r + r.r, s: e.s + r.s };
}
export function subtract(e, r) {
  return { q: e.q - r.q, r: e.r - r.r, s: e.s - r.s };
}
export function multiply(e, r) {
  return { q: e.q * r, r: e.r * r, s: e.s * r };
}
export function length({ q: e, r: r, s: t }) {
  return Math.max(Math.abs(e), Math.abs(r), Math.abs(t));
}
export function distance(e, r) {
  return length(subtract(e, r));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ0aG91c2FuZHRoUm91bmQiLCJESVJFQ1RJT05TIiwicSIsInIiLCJzIiwiRElBR09OQUxTIiwibWFrZU5vZGUiLCJraW5kIiwiVHlwZUVycm9yIiwicmVzdWx0IiwiaWQiLCJsaW5rcyIsIldlYWtTZXQiLCJjZWxscyIsIm5vZGUiLCJtYXAiLCJlIiwiYWRkIiwibXVsdGlwbHkiLCJmaWx0ZXIiLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJlZGdlcyIsInZlcnRpY2VzIiwiYXJlRXF1YWwiLCJhIiwiYiIsInN1YnRyYWN0IiwiY2VsbCIsImsiLCJsZW5ndGgiLCJNYXRoIiwibWF4IiwiYWJzIiwiZGlzdGFuY2UiXSwic291cmNlcyI6WyIuLi9zcmMvaGV4LnRzIl0sIm1hcHBpbmdzIjoiMEJBSVNBLE1BQXVCLG1CQThEekIsTUFBTUMsV0FBMEIsQ0FDckMsQ0FBRUMsRUFBRyxFQUFHQyxHQUFJLEVBQUdDLEVBQUcsR0FDbEIsQ0FBRUYsRUFBRyxFQUFHQyxHQUFJLEVBQUdDLEVBQUcsR0FDbEIsQ0FBRUYsR0FBSSxFQUFHQyxFQUFHLEVBQUdDLEVBQUcsR0FDbEIsQ0FBRUYsR0FBSSxFQUFHQyxFQUFHLEVBQUdDLEVBQUcsR0FDbEIsQ0FBRUYsRUFBRyxFQUFHQyxFQUFHLEVBQUdDLEdBQUksR0FDbEIsQ0FBRUYsRUFBRyxFQUFHQyxFQUFHLEVBQUdDLEdBQUksV0FLYixNQUFNQyxVQUF5QixDQUNwQyxDQUFFSCxFQUFHLEVBQUdDLEdBQUksRUFBR0MsR0FBSSxHQUNuQixDQUFFRixFQUFHLEVBQUdDLEdBQUksRUFBR0MsRUFBRyxHQUNsQixDQUFFRixHQUFJLEVBQUdDLEdBQUksRUFBR0MsRUFBRyxHQUNuQixDQUFFRixHQUFJLEVBQUdDLEVBQUcsRUFBR0MsRUFBRyxHQUNsQixDQUFFRixHQUFJLEVBQUdDLEVBQUcsRUFBR0MsR0FBSSxHQUNuQixDQUFFRixFQUFHLEVBQUdDLEVBQUcsRUFBR0MsR0FBSSxXQVVkLFNBQVVFLFVBQVNKLEVBQUVBLEVBQUNDLEVB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
