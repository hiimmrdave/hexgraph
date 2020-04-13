import { makeNode } from "./main";
import { makeCell } from "./cell";
import { makeEdge } from "./edge";
export function makeVertex({ q, r, s }) {
    var vertex = Object.apply(makeNode({ q, r, s }), {
        nodetype: 2
    });
    return vertex;
}
export function cells(vertex) {
    return [makeCell(vertex)];
}
export function edges(vertex) {
    return [makeEdge(vertex)];
}
export function vertices(vertex) {
    return [makeVertex(vertex)];
}
//# sourceMappingURL=vertex.js.map