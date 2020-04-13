export function makeNode({ q, r, s }) {
    if (q + r + s > 1e-3) {
        throw new TypeError("q+r+s must sum to zero");
    }
    return {
        q,
        r,
        s,
        id: `${q},${r},${s}`,
        links: new WeakSet()
    };
}
export function areEqual(a, b) {
    return a.q === b.q && a.r === b.r && a.s === b.s && a.nodetype === b.nodetype;
}
//# sourceMappingURL=main.js.map