import { HALF_PI, PI_OVER_SIX, SQRT_THREE } from "./math";
import { XYVector, QRSVector, Layout, HexNode } from "./types";
import * as Hex from "./hex";

/**
 *
 * @param theta the angle from center to point 0, ccw in multiples of pi/12
 * @returns objectified transformation matricies for QRS->XY and XY->QRS
 */
export function orientation(theta: number = 0) {
  return {
    f: {
      q: {
        x: Math.cos(theta - PI_OVER_SIX) * SQRT_THREE,
        y: Math.sin(theta + 5 * PI_OVER_SIX) * SQRT_THREE,
      },
      r: {
        x: Math.cos(theta - HALF_PI) * SQRT_THREE,
        y: Math.sin(theta + HALF_PI) * SQRT_THREE,
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
  radius: XYVector,
  origin: XYVector,
  size: XYVector
): Layout {
  return { orientation: orientation(theta), radius, origin, size };
}

export function cubeToPoint(
  c: QRSVector,
  { orientation: o, radius, origin }: Layout
): XYVector {
  const x = (o.f.q.x * c.q + o.f.r.x * c.r) * radius.x + origin.x,
    y = (o.f.q.y * c.q + o.f.r.y * c.r) * radius.y + origin.y;
  return { x, y };
}

export function pointToCube(
  p: XYVector,
  { orientation: o, radius, origin }: Layout
): QRSVector {
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
}): XYVector[] {
  return Hex.vertices(cell).map((vertex) => cubeToPoint(vertex, layout));
}
