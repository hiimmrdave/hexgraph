import * as HexMath from "./math.js";
import * as Hex from "./hex.js";
export function orientation(theta = 0) {
  return {
    f: {
      q: {
        x: Math.cos(theta - HexMath.PI_OVER_SIX) * HexMath.SQRT_THREE,
        y: Math.sin(theta + 5 * HexMath.PI_OVER_SIX) * HexMath.SQRT_THREE,
      },
      r: {
        x: Math.cos(theta - HexMath.HALF_PI) * HexMath.SQRT_THREE,
        y: Math.sin(theta + HexMath.HALF_PI) * HexMath.SQRT_THREE,
      },
    },
    b: {
      q: {
        x: (Math.cos(theta) * 2) / 3,
        y: (Math.sin(theta) * -2) / 3,
      },
      r: {
        x: (Math.cos(theta + 2 * HexMath.PI_OVER_SIX) * -2) / 3,
        y: (Math.sin(theta + 2 * HexMath.PI_OVER_SIX) * 2) / 3,
      },
    },
  };
}
export function config(theta, radius, origin, size) {
  return { orientation: orientation(theta), radius, origin, size };
}
export function cubeToPoint(c, { orientation: o, radius, origin }) {
  const x = (o.f.q.x * c.q + o.f.r.x * c.r) * radius.x + origin.x,
    y = (o.f.q.y * c.q + o.f.r.y * c.r) * radius.y + origin.y;
  return { x, y };
}
export function pointToCube(p, { orientation: o, radius, origin }) {
  const pt = {
      x: (p.x - origin.x) / radius.x,
      y: (p.y - origin.y) / radius.y,
    },
    q = o.b.q.x * pt.x + o.b.q.y * pt.y,
    r = o.b.r.x * pt.x + o.b.r.y * pt.y,
    s = -q - r;
  return { q, r, s };
}
export function cellPoints({ cell, layout }) {
  return Hex.vertices(cell).map(vertex => cubeToPoint(vertex, layout));
}
//# sourceMappingURL=layout.js.map
