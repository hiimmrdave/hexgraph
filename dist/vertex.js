import { makeNode } from "./main";
import { makeCell } from "./cell";
import { makeEdge } from "./edge";
export function makeVertex({ q, r, s }) {
    return makeNode({ q, r, s }, 2);
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