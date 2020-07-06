import * as hex from "./hex";
import * as Cell from "./cell";
import * as Vertex from "./vertex";
export function make({ q, r, s }) {
    var edge = Object.assign(hex.makeNode({ q, r, s }), {
        nodetype: "Edge",
    });
    return edge;
}
export function cells(edge) {
    return Cell.DIRECTIONS.map((e) => Cell.make(hex.add(edge, hex.multiply(e, 0.5)))).filter((e) => Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s));
}
export function edges(edge) {
    return Cell.DIRECTIONS.map((e) => make(hex.add(edge, hex.multiply(e, 0.5)))).filter((e) => !(Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s)));
}
export function vertices(edge) {
    return Cell.DIAGONALS.map((e) => Vertex.make(hex.add(edge, hex.multiply(e, 1 / 6)))).filter((e) => Number.isInteger(e.q * 3) &&
        Number.isInteger(e.r * 3) &&
        Number.isInteger(e.s * 3));
}
//# sourceMappingURL=edge.js.map