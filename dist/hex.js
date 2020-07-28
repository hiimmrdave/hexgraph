import { thousandthRound } from "./math";
export function makeNode({ q, r, s }, kind) {
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