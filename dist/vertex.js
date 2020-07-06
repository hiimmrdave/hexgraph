import * as hex from "./hex";
import * as Cell from "./cell";
import * as Edge from "./edge";
export function make({ q, r, s }) {
    var vertex = Object.assign(hex.makeNode({ q, r, s }), {
        nodetype: "Vertex",
    });
    return vertex;
}
export function cells(vertex) {
    return Cell.DIAGONALS.map((e) => Cell.make(hex.add(vertex, hex.multiply(e, 1 / 3)))).filter((e) => Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s));
}
export function edges(vertex) {
    return Cell.DIAGONALS.map((e) => Edge.make(hex.add(vertex, hex.multiply(e, 1 / 6)))).filter((e) => Number.isInteger(e.q * 2) &&
        Number.isInteger(e.r * 2) &&
        Number.isInteger(e.s * 2));
}
export function vertices(vertex) {
    return Cell.DIAGONALS.map((e) => make(hex.add(vertex, hex.multiply(e, 1 / 3)))).filter((e) => !(Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s)));
}
//# sourceMappingURL=vertex.js.map