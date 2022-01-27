import { cellPoints as Z, cubeToPoint as _ } from "./layout.js";
import { makeVulgar as tt } from "./utils.js";
const et = "http://www.w3.org/2000/svg";
function nt(t, e) {
  return `M${Z({ cell: t, layout: e })
    .map((t) => `${t.x},${t.y}`)
    .join(" L")}z`;
}
function it({ size: t }) {
  const e = document.createElementNS(et, "svg");
  return (
    e.setAttribute("xmlns", et),
    e.setAttribute("viewBox", `0 0 ${t.x} ${t.y}`),
    e.setAttribute("width", t.x.toString(10)),
    e.setAttribute("height", t.y.toString(10)),
    Object.assign(e.style, {
      width: t.x.toString(10),
      height: t.y.toString(10),
      padding: "0",
      margin: "0",
    }),
    e
  );
}
const rt = { Cell: "red", Vertex: "green", Edge: "blue" };
function st(t, e) {
  const n = _(t, e),
    i = document.createElementNS(et, "g");
  return i.appendChild(dt(n, t)), i.appendChild(ot(n, t)), i.appendChild(ct(n, t)), i;
}
function dt({ x: t, y: e }, { q: n, r: i, s: r, id: s, kind: d }) {
  const o = document.createElementNS(et, "circle");
  return (
    o.classList.add(d),
    (o.style.transformOrigin = `${t} ${e}`),
    (o.style.fill = rt[d]),
    o.setAttribute("cx", `${t}`),
    o.setAttribute("cy", `${e}`),
    o.setAttribute("r", "2"),
    Object.assign(o.dataset, { q: n, r: i, s: r, id: s }),
    o
  );
}
function ot({ x: t, y: e }, { q: n, r: i, s: r, kind: s }) {
  const d = document.createElementNS(et, "text");
  return (
    (d.textContent = `${6 * n}, ${6 * i}, ${6 * r}`),
    (d.style.fill = rt[s]),
    d.setAttribute("x", `${t}`),
    d.setAttribute("y", "" + (e - 5)),
    d.setAttribute("text-anchor", "middle"),
    d
  );
}
function ct({ x: t, y: e }, { q: n, r: i, s: r, kind: s }) {
  const d = document.createElementNS(et, "text");
  return (
    (d.textContent = `${tt(n)}, ${tt(i)}, ${tt(r)}`),
    (d.style.fill = rt[s]),
    d.setAttribute("x", `${t}`),
    d.setAttribute("y", `${e + 15}`),
    d.setAttribute("text-anchor", "middle"),
    d.setAttribute("alignment-baseline", "top"),
    d
  );
}
function lt(t, e) {
  const n = document.createElementNS(et, "path"),
    i = _(t, e);
  return (
    n.classList.add("cell"),
    (n.style.transformOrigin = `${i.x}px ${i.y}px`),
    n.setAttribute("d", nt(t, e)),
    (n.dataset.hexNodeId = t.id),
    Object.assign(n.dataset, { q: t.q, r: t.r, s: t.s }),
    n
  );
}
export function renderSvg(t, e, n, i = !1) {
  const r = document.getElementById(t) ?? document.createElement("div"),
    s = it(e);
  n.forEach((t) => {
    "Cell" === t.kind && s.appendChild(lt(t, e));
  }),
    !0 === i &&
      n.forEach((t) => {
        s.appendChild(st(t, e));
      }),
    r.appendChild(s);
}
export function buildCanvas(t, e) {
  const n = document.getElementById(t) ?? document.createElement("div"),
    i = document.createElement("canvas");
  return (
    i.setAttribute("width", e.size.x.toString(10)),
    i.setAttribute("height", e.size.y.toString(10)),
    n.appendChild(i),
    i
  );
}
export function renderCanvasFrame(t, e, n, i = !1) {
  t.clearRect(0, 0, e.size.x, e.size.y),
    n.forEach((n) => {
      "Cell" === n.kind && t.stroke(new Path2D(nt(n, e)));
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjZWxsUG9pbnRzIiwiY3ViZVRvUG9pbnQiLCJtYWtlVnVsZ2FyIiwiU1ZHTlMiLCJjZWxsUGF0aCIsImNlbGwiLCJsYXlvdXQiLCJtYXAiLCJlIiwieCIsInkiLCJqb2luIiwiYnVpbGRTdmdSb290Iiwic2l6ZSIsInN2Z1Jvb3QiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnROUyIsInNldEF0dHJpYnV0ZSIsInRvU3RyaW5nIiwiT2JqZWN0IiwiYXNzaWduIiwic3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsInBhZGRpbmciLCJtYXJnaW4iLCJub2RlQ29sb3JzIiwiQ2VsbCIsIlZlcnRleCIsIkVkZ2UiLCJidWlsZFN2Z01hcmtlciIsInBvaW50Iiwic3BvdCIsImdyb3VwIiwiYXBwZW5kQ2hpbGQiLCJidWlsZFN2Z0RvdCIsImJ1aWxkU3ZnTGFiZWwiLCJidWlsZFN2Z0JvdHRvbVRleHQiLCJxIiwiciIsInMiLCJpZCIsImtpbmQiLCJkb3QiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0cmFuc2Zvcm1PcmlnaW4iLCJmaWxsIiwiZGF0YXNldCIsImxhYmVsIiwidGV4dENvbnRlbnQiLCJidWlsZFN2Z0NlbGwiLCJwYXRoIiwiYyIsImhleE5vZGVJZCIsInJlbmRlclN2ZyIsInRhcmdldElkIiwiZ3JpZCIsImRlYnVnIiwidGFyZ2V0RWxlbSIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsImZvckVhY2giLCJub2RlIiwiYnVpbGRDYW52YXMiLCJjYW52YXNSb290IiwicmVuZGVyQ2FudmFzRnJhbWUiLCJjdHgiLCJfIiwiY2xlYXJSZWN0Iiwic3Ryb2tlIiwiUGF0aDJEIl0sInNvdXJjZXMiOlsiLi4vc3JjL3JlbmRlcmVyLnRzIl0sIm1hcHBpbmdzIjoicUJBQWlDQSxpQkFBWUMsTUFBbUIsbUNBR3ZEQyxPQUFrQixhQUUzQixNQUFNQyxHQUFRLDZCQU9kLFNBQVNDLEdBQVNDLEVBQWdCQyxHQUNoQyxNQUFPLElBQUlOLEVBQVcsQ0FBRUssT0FBTUMs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
