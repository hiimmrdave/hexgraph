import { SQRT_THREE as u, thousandthRound as e } from "./math.js";
import { vertices as n } from "./hex.js";
const x = [
    [1.5, 0],
    [u / 2, u],
  ],
  T = [
    [1, 0],
    [0, 1],
  ];
export function rotateTransform(o) {
  return [
    [Math.cos(o) + 0, 0 - Math.sin(o)],
    [Math.sin(o) + 0, Math.cos(o) + 0],
  ];
}
export function shearTransform(o, n) {
  return [
    [1, -o],
    [-n, 1],
  ];
}
export function scaleTransform(o, n) {
  return [
    [o, 0],
    [0, n],
  ];
}
function m([[o, n], [t, r]]) {
  return [
    [r / (o * r - n * t), n / (n * t - o * r)],
    [t / (n * t - o * r), o / (o * r - n * t)],
  ];
}
function b([[o, n], [t, r]], [[e, u], [i, c]]) {
  return [
    [o * e + n * i, o * u + n * c],
    [t * e + r * i, t * u + r * c],
  ];
}
function h(o) {
  return o.reduce((o, n) => b(n, o), T);
}
export function configureLayout(o, n, t = []) {
  const r = h([x, ...t]);
  return { origin: o, size: n, cubeToPoint: r, pointToCube: m(r) };
}
export function cubeToPoint(o, { origin: n, cubeToPoint: t }) {
  return { x: e(t[0][0] * o.q + t[0][1] * o.r + n.x), y: e(t[1][0] * o.q + t[1][1] * o.r + n.y) };
}
export function pointToCube(o, { origin: n, pointToCube: t }) {
  const r = o.x - n.x,
    e = o.y - n.y,
    u = t[0][0] * r + t[0][1] * e,
    i = t[1][0] * r + t[1][1] * e;
  return { q: u, r: i, s: -u - i };
}
export function cellPoints({ cell: o, layout: t }) {
  return n(o).map((o) => cubeToPoint(o, t));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTUVJUX1RIUkVFIiwidGhvdXNhbmR0aFJvdW5kIiwidmVydGljZXMiLCJRUlhZIiwiSURFTlRJVFkyIiwicm90YXRlVHJhbnNmb3JtIiwidGhldGEiLCJNYXRoIiwiY29zIiwic2luIiwic2hlYXJUcmFuc2Zvcm0iLCJzaGVhclgiLCJzaGVhclkiLCJzY2FsZVRyYW5zZm9ybSIsInNjYWxlWCIsInNjYWxlWSIsImludmVydE1hdHJpeDJ4MiIsImEiLCJiIiwiYyIsImQiLCJjb21wb3NlTWF0cmljZXMyeDIiLCJlIiwiZiIsImciLCJoIiwiY29tcG9zZU1hdHJpeEFycmF5IiwibWF0cmljZXMiLCJyZWR1Y2UiLCJhY2MiLCJjdXIiLCJjb25maWd1cmVMYXlvdXQiLCJvcmlnaW4iLCJzaXplIiwidHJhbnNmb3JtcyIsImN1YmVUb1BvaW50IiwicG9pbnRUb0N1YmUiLCJNIiwieCIsInEiLCJyIiwieSIsInAiLCJwdCIsInMiLCJjZWxsUG9pbnRzIiwiY2VsbCIsImxheW91dCIsIm1hcCIsInZlcnRleCJdLCJzb3VyY2VzIjpbIi4uL3NyYy9sYXlvdXQudHMiXSwibWFwcGluZ3MiOiJxQkFNU0EscUJBQVlDLE1BQXVCLCtCQUNkQyxNQUFnQixXQXdCOUMsTUFBTUMsRUFBa0IsQ0FDcEIsQ0FBQyxJQUFPLEdBQ1IsQ0FBQ0gsRUFBYSxFQUFHQSxJQUVuQkksRUFBdUIsQ0FDckIsQ0FBQyxFQUFHLEdBQ0osQ0FBQyxFQUFHLFdBR0YsU0FBVUMsZ0JBQWdCQyxHQUM5QixNQUFPLENBQ0wsQ0FBQ0MsS0FBS0MsSUFBSUYsR0FBUyxFQUFzQixFQUFsQkMsS0FBS0UsSUFBSUgsSUFDaEMsQ0FBQ0MsS0FBS0UsSUFBSUgsR0FBUyxFQUFHQyxLQUFLQyxJQUFJRixHQUFTLFdBSXRDLFNBQVVJLGVBQWVDLEVBQWdCQyxHQUM3QyxNQUFPLENBQ0wsQ0FBQyxHQUFJRCxHQUNMLEVBQUVDLEVBQVEsV0FJUixTQUFVQyxlQUFlQyxFQUFnQkMsR0FDN0MsTUFBTyxDQUNMLENBQUNELEVBQVEsR0FDVCxDQUFDLEVBQUdDLElBSVIsU0FBU0MsSUFBa0JDLEVBQUdDLElBQUtDLEVBQUdDLEtBQ3BDLE1BQU8sQ0FDTCxDQUFDQSxHQUFLSCxFQUFJRyxFQUFJRixFQUFJQyxHQUFJRCxHQUFLQSxFQUFJQyxFQUFJRixFQUFJRyxJQUN2QyxDQUFDRCxHQUFLRCxFQUFJQyxFQUFJRixFQUFJRyxHQUFJSCxHQUFLQSxFQUFJRyxFQUFJRixFQUFJQyxLQUkzQyxTQUFTRSxJQUFxQkosRUFBR0MsSUFBS0MsRUFBR0MsTUFBa0JFLEVBQUdDLElBQUtDLEVBQUdDLEtBQ3BFLE1BQU8sQ0FDTCxDQUFDUixFQUFJSyxFQUFJSixFQUFJTSxFQUFHUCxFQUFJTSxFQUFJTCxFQUFJTyxHQUM1QixDQUFDTixFQUFJRyxFQUFJRixFQUFJSSxFQUFHTCxFQUFJSSxFQUFJSCxFQUFJSyxJQUloQyxTQUFTQyxFQUFtQkMsR0FDMUIsT0FBT0EsRUFBU0MsUUFBTyxDQUFDQyxFQUFLQyxJQUFRVCxFQUFtQlMsRUFBS0QsSUFBTXpCLFVBRy9ELFNBQVUyQixnQkFDZEMsRUFDQUMsRUFDQUMsRUFBMEIsSUFFMUIsTUFBTUMsRUFBY1QsRUFBbUIsQ0FBQ3ZCLEtBQVMrQixJQUVqRCxNQUFPLENBQ0xGLFNBQ0FDLE9BQ0FFLGNBQ0FDLFlBTGNwQixFQUFnQm1CLFdBUzVCLFNBQVVBLFlBQVloQixHQUFjYSxPQUFFQSxFQUFRRyxZQUFhRSxJQUcvRCxNQUFPLENBQUVDLEVBRkNyQyxFQUFnQm9DLEVBQUUsR0FBRyxHQUFLbEIsRUFBRW9CLEVBQUlGLEVBQUUsR0FBRyxHQUFLbEIsRUFBRXFCLEVBQUlSLEVBQU9NLEdBRXJERyxFQUROeEMsRUFBZ0JvQyxFQUFFLEdBQUcsR0FBS2xCLEVBQUVvQixFQUFJRixFQUFFLEdBQUcsR0FBS2xCLEVBQUVxQixFQUFJUixFQUFPUyxXQUl6RCxTQUFVTCxZQUFZTSxHQUFhVixPQUFFQSxFQUFRSSxZQUFhQyxJQUM5RCxNQUFNTSxFQUFVRCxFQUFFSixFQUFJTixFQUFPTSxFQUF2QkssRUFBNkJELEVBQUVELEVBQUlULEVBQU9TLEVBQzlDRixFQUFJRixFQUFFLEdBQUcsR0FBS00sRUFBT04sRUFBRSxHQUFHLEdBQUtNLEVBQy9CSCxFQUFJSCxFQUFFLEdBQUcsR0FBS00sRUFBT04sRUFBRSxHQUFHLEdBQUtNLEVBRWpDLE1BQU8sQ0FBRUosSUFBR0MsSUFBR0ksR0FEUkwsRUFBSUMsVUFJUCxTQUFVSyxZQUFXQyxLQUFFQSxFQUFJQyxPQUFFQSxJQUNqQyxPQUFPN0MsRUFBUzRDLEdBQU1FLEtBQUtDLEdBQVdkLFlBQVljLEVBQVFGIn0=
