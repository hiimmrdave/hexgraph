import { makeNode } from "./main";
export function makeEdge({ q, r, s }) {
    return Object.assign(makeNode({ q, r, s }), { type: 1 });
}
//# sourceMappingURL=edge.js.map