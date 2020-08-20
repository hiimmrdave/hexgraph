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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLFdBQVcsQ0FBQztBQVFyQyxPQUFPLEtBQUssR0FBRyxNQUFNLFVBQVUsQ0FBQztBQU9oQyxNQUFNLFVBQVUsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDO0lBQ25DLE9BQU87UUFDTCxDQUFDLEVBQUU7WUFDRCxDQUFDLEVBQUU7Z0JBQ0QsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxPQUFPLENBQUMsVUFBVTtnQkFDN0QsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVU7YUFDbEU7WUFDRCxDQUFDLEVBQUU7Z0JBQ0QsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsVUFBVTtnQkFDekQsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsVUFBVTthQUMxRDtTQUNGO1FBQ0QsQ0FBQyxFQUFFO1lBQ0QsQ0FBQyxFQUFFO2dCQUNELENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDNUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7YUFDOUI7WUFDRCxDQUFDLEVBQUU7Z0JBQ0QsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdB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
