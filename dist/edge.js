import * as main from "./main";
import { makeCell, DIRECTIONS } from "./cell";
import { makeVertex } from "./vertex";
export function makeEdge({ q, r, s }) {
    var edge = Object.assign(main.makeNode({ q, r, s }), {
        nodetype: 1
    });
    return edge;
}
export function cells(edge) {
    return DIRECTIONS.map(e => makeCell(main.add(edge, main.multiply(e, 0.5)))).filter(e => Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s));
}
export function edges(edge) {
    return DIRECTIONS.map(e => makeEdge(main.add(edge, main.multiply(e, 0.5)))).filter(e => !(Number.isInteger(e.q) && Number.isInteger(e.r) && Number.isInteger(e.s)));
}
export function vertices(edge) {
    return [makeVertex(edge)];
}
//# sourceMappingURL=edge.js.map