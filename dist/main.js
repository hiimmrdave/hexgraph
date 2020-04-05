export function makeNode({ q, r, s }, nodetype) {
    const self = {
        q,
        r,
        s,
        id: `${q},${r},${s}`,
        links: new WeakSet(),
        nodetype
    };
    if (q + r + s !== 0) {
        throw new TypeError("q+r+s must sum to zero");
    }
    return self;
}
export function areEqual(a, b) {
    return a.q === b.q && a.r === b.r && a.s === b.s;
}
//# sourceMappingURL=main.js.map