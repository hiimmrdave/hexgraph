import { cubeLerp } from "./math";
import * as Hex from "./hex";
import * as Edge from "./edge";
import * as Vertex from "./vertex";
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
export function make({ q, r, s }) {
    var cell = Hex.makeNode({ q, r, s }, "Cell");
    return cell;
}
export function round({ q, r, s }) {
    const approx = {
        q: Math.round(q),
        r: Math.round(r),
        s: Math.round(s),
    }, offset = {
        q: Math.abs(q - approx.q),
        r: Math.abs(r - approx.r),
        s: Math.abs(s - approx.s),
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
    return make(approx);
}
export function cellLerp(a, b, t) {
    return round(cubeLerp(a, b, t));
}
export function cells(cell) {
    return DIRECTIONS.map((e) => make(Hex.add(cell, e)));
}
export function diagonals(cell) {
    return DIAGONALS.map((e) => make(Hex.add(cell, e)));
}
export function edges(cell) {
    return DIRECTIONS.map((e) => Edge.make(Hex.add(Hex.multiply(e, 5e-1), cell)));
}
export function vertices(cell) {
    return DIAGONALS.map((e) => Vertex.make(Hex.add(cell, Hex.multiply(e, 1 / 3))));
}
//# sourceMappingURL=cell.js.map