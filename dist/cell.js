import { cubeLerp } from "./math";
import { makeNode } from "./main";
import { makeEdge } from "./edge";
import { makeVertex } from "./vertex";
export const DIRECTIONS = [
    { q: 1, r: 0, s: -1 },
    { q: 1, r: -1, s: 0 },
    { q: 0, r: -1, s: 1 },
    { q: -1, r: 0, s: 1 },
    { q: -1, r: 1, s: 0 },
    { q: 0, r: 1, s: -1 }
];
export const DIAGONALS = [
    { q: 2, r: -1, s: -1 },
    { q: 1, r: -2, s: 1 },
    { q: -1, r: -1, s: 2 },
    { q: -2, r: 1, s: 1 },
    { q: -1, r: 2, s: -1 },
    { q: 1, r: 1, s: -2 }
];
export function add(a, b) {
    return Object.assign({ ...a }, { q: a.q + b.q, r: a.r + b.r, s: a.s + b.s });
}
export function subtract(a, b) {
    return Object.assign({ ...a }, { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s });
}
export function multiply(cell, k) {
    return Object.assign({ ...cell }, { q: cell.q * k, r: cell.r * k, s: cell.s * k });
}
export function round({ q, r, s }) {
    const approx = {
        q: Math.round(q),
        r: Math.round(r),
        s: Math.round(s)
    }, offset = {
        q: Math.abs(q - approx.q),
        r: Math.abs(r - approx.r),
        s: Math.abs(s - approx.s)
    };
    if (offset.q > offset.r && offset.q > offset.s) {
        approx.q = -1 * approx.r - approx.s;
    }
    else if (offset.r > offset.s) {
        approx.r = -1 * approx.q - approx.s;
    }
    else {
        approx.s = -1 * approx.q - approx.r;
    }
    return makeCell(approx);
}
export function cellLerp(a, b, t) {
    return round(cubeLerp(a, b, t));
}
export function cells(cell) {
    return DIRECTIONS.map(e => makeCell(add(cell, e)));
}
export function diagonals(cell) {
    return DIAGONALS.map(e => makeCell(add(cell, e)));
}
export function edges(cell) {
    return DIRECTIONS.map(e => makeEdge(multiply(add(cell, e), 5e-1)));
}
export function vertices(cell) {
    return [].map(el => makeVertex(cell));
}
export function makeCell({ q, r, s }) {
    return Object.assign(makeNode({ q, r, s }), { nodetype: 0 });
}
//# sourceMappingURL=cell.js.map