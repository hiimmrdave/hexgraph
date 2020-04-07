import { makeNode } from "./main";
import { makeCell } from "./cell";
import { makeVertex } from "./vertex";
export function makeEdge({ q, r, s }) {
    return makeNode({ q, r, s }, 1);
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