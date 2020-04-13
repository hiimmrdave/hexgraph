import orientation from "./orientation";
export function cubeToPoint(c, theta, size, origin) {
    const o = orientation(theta), x = (o.f.x.q * c.q + o.f.x.r * c.r) * size.x + origin.x, y = (o.f.y.q * c.q + o.f.y.r * c.r) * size.y + origin.y;
    return { x, y };
}
export function pointToCube(p, theta, size, origin) {
    const o = orientation(theta), pt = {
        x: (p.x - origin.x) / size.x,
        y: (p.y - origin.y) / size.y
    }, q = o.b.q.x * pt.x + o.b.q.y * pt.y, r = o.b.r.x * pt.x + o.b.r.y * pt.y, s = -q - r;
    return { q, r, s };
}
//# sourceMappingURL=layout.js.map