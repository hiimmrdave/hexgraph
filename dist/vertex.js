import { makeNode } from "./main.js";
export function makeVertex({ q, r, s }) {
    return Object.assign(makeNode({ q, r, s }), { nodetype: 2 });
}
//# sourceMappingURL=vertex.js.map