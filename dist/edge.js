import { makeNode } from "./main.js";
export function makeEdge({ q, r, s }) {
    return Object.assign(makeNode({ q, r, s }), { nodetype: 1 });
}
//# sourceMappingURL=edge.js.map