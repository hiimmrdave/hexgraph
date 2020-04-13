import { makeNode } from "./main";
import { makeCell } from "./cell";
import { makeVertex } from "./vertex";
export function makeEdge({ q, r, s }) {
    var edge = Object.apply(makeNode({ q, r, s }), {
        nodetype: 1
    });
    return edge;
}
export function cells(edge) {
    return [makeCell(edge)];
}
export function edges(edge) {
    return [makeEdge(edge)];
}
export function vertices(edge) {
    return [makeVertex(edge)];
}
//# sourceMappingURL=edge.js.map