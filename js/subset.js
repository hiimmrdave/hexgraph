import * as L from "./hex.js";
import { round as R } from "./cell.js";
import { cubeLerp as K } from "./math.js";
const Q = Object.freeze(L.makeNode({ q: 0, r: 0, s: 0 }, "Cell")),
  U = Object.freeze(L.makeNode({ q: 2, r: -1, s: -1 }, "Cell")),
  V = function (e) {
    return "number" == typeof e ? [e, e] : [e[0], e[1]];
  },
  W = function ({ source: e = Q, toward: t = U }) {
    const r = ["q", "r", "s"],
      o = L.subtract(t, e),
      n = Math.max(Math.abs(o.q), Math.abs(o.r), Math.abs(o.s));
    for (const e of r)
      if (n === Math.abs(o[e])) {
        const t = -n / o[e] > 0 ? 1 : -1;
        return {
          dirs: Object.fromEntries(
            [...r.slice(r.indexOf(e)), ...r.slice(0, r.indexOf(e))].map((e, t) => [
              ["ic", "ia", "ib"][t],
              e,
            ])
          ),
          sign: t,
        };
      }
    return null;
  };
export function line({ source: e = Q, toward: t = U }) {
  if (L.areEqual(e, t)) return new Map().set(e.id, e);
  const r = L.distance(e, t),
    o = new Map();
  for (let n = 0; n <= r; n++) {
    const s = R(K(e, t, (1 / r) * n));
    o.set(s.id, s);
  }
  return o;
}
export function ring({ source: e = Q, size: t = 2 }) {
  if ((t = V(t))[0] < 1) return new Map().set(e.id, e);
  const r = new Map();
  let o = L.makeNode(L.add(e, L.multiply(L.DIRECTIONS[4], t[0])), "Cell");
  for (let e = 0; e < 6; e++) for (let n = 0; n < t[0]; n++) r.set(o.id, o), (o = L.cells(o)[e]);
  return r;
}
export function cone({ source: e = Q, toward: t = U, size: r = 4 }) {
  const o = new Map(),
    { dirs: n, sign: s } = W({ source: e, toward: t });
  r = V(r);
  for (let t = 0; t < r[0]; t++)
    for (let a = 0; a < r[0] - t; a++) {
      const r = -(t + a),
        i = L.makeNode(L.add({ [n.ia]: s * t, [n.ib]: s * a, [n.ic]: s * r }, e), "Cell");
      o.set(i.id, i);
    }
  return o;
}
export function hexagon({ source: e = Q, size: t = 2 }) {
  if ((t = V(t))[0] < 1) return new Map().set(e.id, e);
  const r = new Map();
  for (let o = -t[0]; o <= t[0]; o++)
    for (let n = -t[0]; n <= t[0]; n++)
      if (Math.abs(o) + Math.abs(n) + Math.abs(-o - n) < 2 * t[0]) {
        const t = -(o + n),
          s = L.makeNode(L.add(e, { q: o, r: n, s: t }), "Cell");
        r.set(s.id, s);
      }
  return r;
}
export function rhombus({ source: e = Q, toward: t = U, size: r = 2 }) {
  const o = new Map(),
    { dirs: n, sign: s } = W({ source: e, toward: t });
  r = V(r);
  for (let t = 0; t < r[0]; t++)
    for (let a = 0; a < r[0]; a++) {
      const r = -(t + a),
        i = L.makeNode(L.add({ [n.ia]: s * t, [n.ib]: s * a, [n.ic]: s * r }, e), "Cell");
      o.set(i.id, i);
    }
  return o;
}
export function intersection(e, t) {
  const r = new Map();
  for (const [o, n] of e.entries()) t.has(o) && L.areEqual(t.get(o), n) && r.set(o, n);
  return r;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJIZXgiLCJyb3VuZCIsImN1YmVMZXJwIiwiQ0VMTFpFUk8iLCJPYmplY3QiLCJmcmVlemUiLCJtYWtlTm9kZSIsInEiLCJyIiwicyIsIkNFTExPTkUiLCJtYWtlVHdvU2l6ZSIsInNpemUiLCJmaW5kV2VkZ2UiLCJzb3VyY2UiLCJ0b3dhcmQiLCJoZXhDb29yZHMiLCJkaXIiLCJzdWJ0cmFjdCIsIm1heCIsIk1hdGgiLCJhYnMiLCJjb29yZCIsImRpcmVjdGlvblNpZ24iLCJkaXJzIiwiZnJvbUVudHJpZXMiLCJzbGljZSIsImluZGV4T2YiLCJtYXAiLCJlIiwiaSIsInNpZ24iLCJsaW5lIiwiYXJlRXF1YWwiLCJNYXAiLCJzZXQiLCJpZCIsInQiLCJkaXN0YW5jZSIsImlpIiwibmV3Q2VsbCIsInJpbmciLCJyaW5nQ2VsbCIsImFkZCIsIm11bHRpcGx5IiwiRElSRUNUSU9OUyIsImlqIiwiY2VsbHMiLCJjb25lIiwiaWEiLCJpYiIsImljIiwiaGV4YWdvbiIsIm5ld05vZGUiLCJyaG9tYnVzIiwiaW50ZXJzZWN0aW9uIiwiYSIsImIiLCJrZXkiLCJ2YWwiLCJlbnRyaWVzIiwiaGFzIiwiZ2V0Il0sInNvdXJjZXMiOlsiLi4vc3JjL3N1YnNldC50cyJdLCJtYXBwaW5ncyI6IlVBSVlBLE1BQVMsMkJBQ1pDLE1BQWEsK0JBQ2JDLE1BQWdCLFlBbUJ6QixNQUFNQyxFQUF5QkMsT0FBT0MsT0FDbENMLEVBQUlNLFNBQVMsQ0FBRUMsRUFBRyxFQUFHQyxFQUFHLEVBQUdDLEVBQUcsR0FBSyxTQUVyQ0MsRUFBd0JOLE9BQU9DLE9BQzdCTCxFQUFJTSxTQUFTLENBQUVDLEVBQUcsRUFBR0MsR0FBSSxFQUFHQyxHQUFJLEdBQUssU0FFdkNFLEVBQWMsU0FBcUJDLEdBQ2pDLE1BQW9CLGlCQUFUQSxFQUNGLENBQUNBLEVBQU1BLEdBRVQsQ0FBQ0EsRUFBSyxHQUFJQSxFQUFLLEtBRXhCQyxFQUFZLFVBQW1CQyxPQUM3QkEsRUFBU1gsRUFBUVksT0FDakJBLEVBQVNMLElB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
