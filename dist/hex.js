import { thousandthRound } from "./math";
export function makeNode({ q, r, s }) {
    if (q + r + s > 1e-3) {
        throw new TypeError("q+r+s must sum to zero");
    }
    return {
        q,
        r,
        s,
        id: `${thousandthRound(q)},${thousandthRound(r)},${thousandthRound(s)}`,
        links: new WeakSet(),
    };
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
//# sourceMappingURL=hex.js.map