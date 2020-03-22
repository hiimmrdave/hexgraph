function thousandthRound(n) {
    return n.toFixed(3);
}
function lerp(m, n, t) {
    return m * (1 - t) + n * t;
}
const DIRECTIONS = [
    { q: 1, r: 0, s: -1 },
    { q: 1, r: -1, s: 0 },
    { q: 0, r: -1, s: 1 },
    { q: -1, r: 0, s: 1 },
    { q: -1, r: 1, s: 0 },
    { q: 0, r: 1, s: -1 }
], DIAGONALS = [
    { q: 2, r: -1, s: -1 },
    { q: 1, r: -2, s: 1 },
    { q: -1, r: -1, s: 2 },
    { q: -2, r: 1, s: 1 },
    { q: -1, r: 2, s: -1 },
    { q: 1, r: 1, s: -2 }
], PI_OVER_THREE = Math.PI / 3, SQRT_THREE = Math.sqrt(3);
const Cell = {
    add: (a, b) => ({ q: a.q + b.q, r: a.r + b.r, s: a.s + b.s }),
    subtract: (a, b) => ({ q: a.q - b.q, r: a.r - b.r, s: a.s - b.s }),
    multiply: (cell, k) => ({ q: cell.q * k, r: cell.r * k, s: cell.s * k }),
    round: ({ q, r, s }) => {
        const approx = {
            q: Math.round(q),
            r: Math.round(r),
            s: Math.round(s)
        }, offset = {
            q: Math.abs(q - approx.q),
            r: Math.abs(r - approx.r),
            s: Math.abs(s - approx.s)
        };
        if (offset.q > offset.r && offset.q > offset.s) {
            approx.q = -1 * approx.r - approx.s;
        }
        else if (offset.r > offset.s) {
            approx.r = -1 * approx.q - approx.s;
        }
        else {
            approx.s = -1 * approx.q - approx.r;
        }
        return approx;
    },
    cellLerp: (a, b, t) => ({ q: lerp(a.q, b.q, t), r: lerp(a.q, b.q, t), s: lerp(a.q, b.q, t) }),
    cells: (cell) => DIRECTIONS.map((e) => Cell.add(cell, e)),
}, Edge = {}, Vertex = {};
function makeNode({ q, r, s }) {
    const self = {
        q,
        r,
        s,
        id: `${q},${r},${s}`,
        links: new WeakSet(),
    };
    if (q + r + s !== 0) {
        throw new TypeError("q+r+s must sum to zero");
    }
    return self;
}
;
function areEqual(a, b) {
    return (a.q === b.q && a.r === b.r && a.s === b.s);
}
function makeCell({ q, r, s }) {
    return Object.assign(makeNode({ q, r, s }), { type: 0 });
}
function makeVertex({ q, r, s }) {
    return Object.assign(makeNode({ q, r, s }), { type: 2 });
}
function makeEdge({ q, r, s }) {
    return Object.assign(makeNode({ q, r, s }), { type: 1 });
}
module.exports = {
    makeCell, makeEdge, makeVertex, makeNode, Cell, Vertex, Edge,
    DIAGONALS, DIRECTIONS, lerp, thousandthRound, areEqual
};
//# sourceMappingURL=index.js.map