import * as main from "./main";
import * as Cell from "./cell";
import * as Vertex from "./vertex";
export function make({ q, r, s }) {
    var edge = Object.assign(main.makeNode({ q, r, s }), {
        nodetype: 1,
    });
    return edge;
}
export function cells(edge) {
    return Cell.DIRECTIONS.map((e) => Cell.make(main.add(edge, main.multiply(e, 0.5)))).filter((e) => Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s));
}
export function edges(edge) {
    return Cell.DIRECTIONS.map((e) => make(main.add(edge, main.multiply(e, 0.5)))).filter((e) => !(Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s)));
}
export function vertices(edge) {
    return Cell.DIAGONALS.map((e) => Vertex.make(main.add(edge, main.multiply(e, 1 / 6)))).filter((e) => Number.isInteger(e.q * 3) &&
        Number.isInteger(e.r * 3) &&
        Number.isInteger(e.s * 3));
}
//# sourceMappingURL=edge.js.map