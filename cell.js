import { lerp } from "./math";
import { makeNode } from "./main";
export const DIRECTIONS = [
    { q: 1, r: 0, s: -1 },
    { q: 1, r: -1, s: 0 },
    { q: 0, r: -1, s: 1 },
    { q: -1, r: 0, s: 1 },
    { q: -1, r: 1, s: 0 },
    { q: 0, r: 1, s: -1 }
], DIAGONALS = [
    { q: 2, r: -1, s: -1 },
    { q: 1, r: -2, s: 1 },
    { q: -1, r: -1, s: 2 },
    { q: -2, r: 1, s: 1 },
    { q: -1, r: 2, s: -1 },
    { q: 1, r: 1, s: -2 }
];
export function add(a, b) {
    return { q: a.q + b.q, r: a.r + b.r, s: a.s + b.s };
}
export function subtract(a, b) {
    return { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s };
}
export function multiply(cell, k) {
    return { q: cell.q * k, r: cell.r * k, s: cell.s * k };
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
    return approx;
}
export function cellLerp(a, b, t) {
    return { q: lerp(a.q, b.q, t), r: lerp(a.q, b.q, t), s: lerp(a.q, b.q, t) };
}
export function cells(cell) {
    return DIRECTIONS.map((e) => add(cell, e));
}
export function diagonals(cell) {
    return DIAGONALS.map((e) => add(cell, e));
}
export function edges(cell) {
    return DIRECTIONS.map((e) => multiply(add(cell, e), 5e-1));
}
export function vertices(cell) {
    return [cell];
}
export function makeCell({ q, r, s }) {
    return Object.assign(makeNode({ q, r, s }), { type: 0 });
}
//# sourceMappingURL=cell.js.map