import { thousandthRound, HALF_PI, PI_OVER_SIX, SQRT_THREE } from "./math";
import { xyVector, qrsVector, Layout, HexNode } from "./types";
import * as Cell from "./cell"

/**
 *
 * @param theta the angle from center to point 0, ccw in multiples of pi/12
 * @returns objectified transformation matricies for QRS->XY and XY->QRS
 */
export function orientation(theta: number = 0) {
  return {
    f: {
      x: {
        q: Math.cos(theta - PI_OVER_SIX) * SQRT_THREE,
        r: Math.cos(theta - HALF_PI) * SQRT_THREE,
      },
      y: {
        q: Math.sin(theta + 5 * PI_OVER_SIX) * SQRT_THREE,
        r: Math.sin(theta + HALF_PI) * SQRT_THREE,
      },
    },
    b: {
      q: {
        x: (Math.cos(theta) * 2) / 3,
        y: (Math.sin(theta) * -2) / 3,
      },
      r: {
        x: (Math.cos(theta + 2 * PI_OVER_SIX) * -2) / 3,
        y: (Math.sin(theta + 2 * PI_OVER_SIX) * 2) / 3,
      },
    },
  };
}

export function layoutConfig(
  theta: number,
  radius: xyVector,
  origin: xyVector
): Layout {
  return { orientation: orientation(theta), radius, origin };
}

export function cubeToPoint(
  c: qrsVector,
  { orientation: o, radius, origin }: Layout
): xyVector {
  const x = (o.f.x.q * c.q + o.f.x.r * c.r) * radius.x + origin.x,
    y = (o.f.y.q * c.q + o.f.y.r * c.r) * radius.y + origin.y;
  return { x, y };
}

export function pointToCube(
  p: xyVector,
  { orientation: o, radius, origin }: Layout
): qrsVector {
  const pt = {
      x: (p.x - origin.x) / radius.x,
      y: (p.y - origin.y) / radius.y,
    },
    q = o.b.q.x * pt.x + o.b.q.y * pt.y,
    r = o.b.r.x * pt.x + o.b.r.y * pt.y,
    s = -q - r;
  return { q, r, s };
}

export function cellPoints({
  cell,
  layout,
}: {
  cell: HexNode;
  layout: Layout;
}): xyVector[] {
  return Cell.vertices(cell).map(vertex=>cubeToPoint(vertex,layout))
}
