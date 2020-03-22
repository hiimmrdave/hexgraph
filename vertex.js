import { makeNode } from "./main";
export function makeVertex({ q, r, s }) {
    return Object.assign(makeNode({ q, r, s }), { type: 2 });
}
//# sourceMappingURL=vertex.js.map