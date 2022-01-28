import { buildCanvas as g, renderCanvasFrame as y, renderSvg as v } from "./renderer.js";
import {
  configureLayout as $,
  rotateTransform as E,
  shearTransform as C,
  scaleTransform as q,
  pointToCube as j,
} from "./layout.js";
import { makeGrid as z } from "./grid.js";
import * as I from "./subset.js";
import * as L from "./hex.js";
import {
  getFloatValue as S,
  getIntValue as B,
  getRadioValue as F,
  getStringValue as k,
  getCheckbox as w,
} from "./utils.js";
import { thousandthRound as e } from "./math.js";
const M = "svghg",
  X = "canvhg",
  Y = ["line", "ring", "hexagon", "cone", "rhombbus"],
  A = "shapes",
  D = $({ x: 45, y: 45 }, { x: 90, y: 90 }, [q(5, 5)]),
  N = z({ size: 5 }),
  O = L.makeNode({ q: 1, r: -1, s: 0 }, "Cell"),
  P = { q: -2, r: 4, s: -2 },
  G = [
    I.line({ source: O, toward: P }),
    I.ring({ source: O, size: 3 }),
    I.hexagon({ source: O, size: 3 }),
    I.cone({ source: O, toward: P, size: 4 }),
    I.rhombus({ source: O, toward: P, size: 3 }),
  ],
  H = document.getElementById("svghg"),
  J = document.getElementById("st");
export const inputs = document.querySelector('form[id="params"]'),
  getForm = () => [
    $({ x: B("orx"), y: B("ory") }, { x: B("csx"), y: B("csy") }, [
      E((S("orientation") * Math.PI) / 12),
      C(S("shx"), S("shy")),
      q(B("hsx"), B("hsy")),
    ]),
    z({ shape: F("shape"), size: [B("gs1"), B("gs2")], populate: !0 }),
    w("debug"),
  ],
  rendSvg = () => {
    const e = getForm();
    let t;
    for (document.getElementById("shapes").style.width = `${k("csx")}px`; (t = H.lastChild); )
      H.removeChild(t);
    v("svghg", ...e);
  },
  makeCanv = () => {
    const [e, t] = getForm(),
      o = g("canvhg", e),
      s = o.getContext("2d");
    return document.getElementById("canvhg").appendChild(o), y(s, e, t), s;
  },
  rendCanv = (e) => {
    y(e, ...getForm());
  };
document.addEventListener("DOMContentLoaded", () => {
  rendSvg();
  const e = document.getElementById("shapes");
  Y.forEach((t, o) => {
    const s = document.createElement("div"),
      r = G[o];
    (s.id = t), (s.style.display = "inline-block"), e.appendChild(s), v(t, D, N);
    s.querySelector(`[data-hex-node-id="${O.id}"]`).classList.add("source"),
      r.forEach((e) => {
        const o = document.querySelector(`#${t} [data-hex-node-id="${e.id}"]`);
        o && o.classList.add("hilit");
      });
  });
}),
  inputs.addEventListener("input", () => {
    rendSvg();
  }),
  H.addEventListener("mouseup", (t) => {
    if (!t.target.matches(".cell")) return;
    const [o] = getForm(),
      s = { x: t.offsetX, y: t.offsetY },
      { q: r, r: n, s: d } = j(s, o),
      a = `x: ${t.offsetX}, y: ${t.offsetY}`,
      i = `q: ${e(r)}, r: ${e(n)}, s: ${e(d)}`,
      c = t.target.getAttribute("data-hex-node-id");
    J.innerText = `click coordinates: ${a}\n  fractional qrs coordinates: ${i}\n  hex cell coordinates: ${c}`;
  });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJidWlsZENhbnZhcyIsInJlbmRlckNhbnZhc0ZyYW1lIiwicmVuZGVyU3ZnIiwiY29uZmlndXJlTGF5b3V0Iiwicm90YXRlVHJhbnNmb3JtIiwic2hlYXJUcmFuc2Zvcm0iLCJzY2FsZVRyYW5zZm9ybSIsInBvaW50VG9DdWJlIiwibWFrZUdyaWQiLCJTdWJzZXQiLCJIZXgiLCJnZXRGbG9hdFZhbHVlIiwiZ2V0SW50VmFsdWUiLCJnZXRSYWRpb1ZhbHVlIiwiZ2V0U3RyaW5nVmFsdWUiLCJnZXRDaGVja2JveCIsInRob3VzYW5kdGhSb3VuZCIsInN2Z0dyaWRUYXJnZXQiLCJjYW52YXNHcmlkVGFyZ2V0Iiwic2hhcGVzIiwic2hhcGVzSG9sZGVyIiwic2hhcGVMYXlvdXRDb25maWciLCJ4IiwieSIsInNoYXBlR3JpZCIsInNpemUiLCJzb3VyY2UiLCJtYWtlTm9kZSIsInEiLCJyIiwicyIsInRvd2FyZCIsInN1YnNldHMiLCJsaW5lIiwicmluZyIsImhleGFnb24iLCJjb25lIiwicmhvbWJ1cyIsInN2Z1JlbmRlckNvbnRleHQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3QiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0Rm9ybSIsIk1hdGgiLCJQSSIsInNoYXBlIiwicG9wdWxhdGUiLCJyZW5kU3ZnIiwiY29uZmlnIiwibGFzdCIsInN0eWxlIiwid2lkdGgiLCJsYXN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsIm1ha2VDYW52IiwibGF5b3V0IiwiZ3JpZCIsImNhbnZhcyIsImN0eCIsImdldENvbnRleHQiLCJhcHBlbmRDaGlsZCIsInJlbmRDYW52IiwiYWRkRXZlbnRMaXN0ZW5lciIsImhvbGRlciIsImZvckVhY2giLCJpbmRleCIsInNoYXBlQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsInN1YnNldCIsImlkIiwiZGlzcGxheSIsImNsYXNzTGlzdCIsImFkZCIsImUiLCJjZWxsIiwiZXYiLCJ0YXJnZXQiLCJtYXRjaGVzIiwiY2xpY2tYWSIsIm9mZnNldFgiLCJvZmZzZXRZIiwieHkiLCJwdGMiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lclRleHQiXSwic291cmNlcyI6WyIuLi9zcmMvbWFpbi50cyJdLCJtYXBwaW5ncyI6InNCQVFTQSx1QkFBYUMsZUFBbUJDLE1BQWlCLDBDQUd4REMscUJBQ0FDLG9CQUNBQyxvQkFDQUMsaUJBQ0FDLE1BRUssaUNBQ3NCQyxNQUFnQixzQkFDakNDLE1BQVksd0JBQ1pDLE1BQVMsbUNBQ1pDLGlCQUFlQyxtQkFBYUMsb0JBQWVDLGlCQUFnQkMsTUFBbUIsdUNBQzlFQyxNQUF1QixZQUVoQyxNQUFNQyxFQUFnQixRQUNwQkMsRUFBbUIsU0FDbkJDLEVBQVMsQ0FBQyxPQUFRLE9BQVEsVUFBVyxPQUFRLFlBQzdDQyxFQUFlLFNBQ2ZDLEVBQWtDbEIsRUFBZ0IsQ0FBRW1CLEVBQUcsR0FBSUMsRUFBRyxJQUFNLENBQUVELEVBQUcsR0FBSUMsRUFBRyxJQUFNLENBQ3BGakIsRUFBZSxFQUFHLEtBRXBCa0IsRUFBcUJoQixFQUFTLENBQUVpQixLQUFNLElBQ3RDQyxFQUFTaEIsRUFBSWlCLFNBQVMsQ0FBRUMsRUFBRyxFQUFHQyxHQUFJLEVBQUdDLEVBQUcsR0FBSyxRQUM3Q0MsRUFBUyxDQUFFSCxHQUFJLEVBQUdDLEVBQUcsRUFBR0MsR0FBSSxHQUM1QkUsRUFBVSxDQUNSdkIsRUFBT3dCLEtBQUssQ0FBRVAsU0FBUUssV0FDdEJ0QixFQUFPeUIsS0FBSyxDQUFFUixTQUFRRCxLQUFNLElBQzVCaEIsRUFBTzBCLFFBQVEsQ0FBRVQsU0FBUUQsS0FBTSxJQUMvQmhCLEVBQU8yQixLQUFLLENBQUVWLFNBQVFLLFNBQVFOLEtBQU0sSUFDcENoQixFQUFPNEIsUUFBUSxDQUFFWCxTQUFRSyxTQUFRTixLQUFNLEtBRXpDYSxFQUFtQkMsU0FBU0MsZUFqQlIsU0FrQnBCQyxFQUFLRixTQUFTQyxlQUFlLGFBQ3hCLE1BQU1FLE9BQVNILFNBQVNJLGNBQWMscUJBQzNDQyxRQUFVLElBQ0QsQ0FDTHpDLEVBQ0UsQ0FBRW1CLEVBQUdWLEVBQVksT0FBUVcsRUFBR1gsRUFBWSxRQUN4QyxDQUFFVSxFQUFHVixFQUFZLE9BQVFXLEVBQUdYLEVBQVksUUFDeEMsQ0FDRVIsRUFBaUJPLEVBQWMsZUFBaUJrQyxLQUFLQyxHQUFNLElBQzNEekMsRUFBZU0sRUFBYyxPQUFRQSxFQUFjLFFBQ25ETCxFQUFlTSxFQUFZLE9BQVFBLEVBQVksVUFHbkRKLEVBQVMsQ0FDUHVDLE1BQU9sQyxFQUFjLFNBQ3JCWSxLQUFNLENBQUNiLEVBQVksT0FBUUEsRUFBWSxRQUN2Q29DLFVBQVUsSUFFWmpDLEVBQVksVUFHaEJrQyxRQUFVLEtBQ1IsTUFBTUMsRUFBU04sVUFFZixJQUFJTyxFQUVKLElBSFdaLFNBQVNDLGVBdENQLFVBd0NOWSxNQUFNQyxNQUFRLEdBQUd2QyxFQUFlLFdBQy9CcUMsRUFBT2IsRUFBaUJnQixXQUM5QmhCLEVBQWlCaUIsWUFBWUosR0FFL0JqRCxFQS9Da0IsV0ErQ1VnRCxJQUU5Qk0sU0FBVyxLQUNULE1BQU9DLEVBQVFDLEdBQVFkLFVBQ3JCZSxFQUFTM0QsRUFsRE0sU0FrRHdCeUQsR0FDdkNHLEVBQU1ELEVBQU9FLFdBQVcsTUFJMUIsT0FIaUJ0QixTQUFTQyxlQXBEVCxVQXFESnNCLFlBQVlILEdBQ3pCMUQsRUFBa0IyRCxFQUFLSCxFQUFRQyxHQUN4QkUsR0FFVEcsU0FBWUgsSUFDVjNELEVBQWtCMkQsS0FBUWhCLFlBSzlCTCxTQUFTeUIsaUJBQWlCLG9CQUFvQixLQUM1Q2YsVUFHQSxNQUFNZ0IsRUFBUzFCLFNBQVNDLGVBakVULFVBa0VmckIsRUFBTytDLFNBQVEsQ0FBQ25CLEVBQU9vQixLQUNyQixNQUFNQyxFQUFpQjdCLFNBQVM4QixjQUFjLE9BQzVDQyxFQUFTdEMsRUFBUW1DLEdBQ25CQyxFQUFlRyxHQUFLeEIsRUFDcEJxQixFQUFlaEIsTUFBTW9CLFFBQVUsZUFDL0JQLEVBQU9ILFlBQVlNLEdBQ25CbEUsRUFBVTZDLEVBQU8xQixFQUFtQkcsR0FDbEI0QyxFQUFlekIsY0FDL0Isc0JBQXNCakIsRUFBTzZDLFFBRXJCRSxVQUFVQyxJQUFJLFVBQ3hCSixFQUFPSixTQUFTUyxJQUNkLE1BQU1DLEVBQU9yQyxTQUFTSSxjQUNwQixJQUFJSSx3QkFBNEI0QixFQUFFSixRQUVoQ0ssR0FDRkEsRUFBS0gsVUFBVUMsSUFBSSxrQkFNM0JoQyxPQUFPc0IsaUJBQWlCLFNBQVMsS0FDL0JmLGFBR0ZYLEVBQWlCMEIsaUJBQWlCLFdBQVlhLElBQzVDLElBQU1BLEVBQUdDLE9BQW1CQyxRQUFRLFNBQVUsT0FDOUMsTUFBT3RCLEdBQVViLFVBQ2ZvQyxFQUFvQixDQUFFMUQsRUFBR3VELEVBQUdJLFFBQVMxRCxFQUFHc0QsRUFBR0ssVUFDM0N0RCxFQUFFQSxFQUFDQyxFQUFFQSxFQUFDQyxFQUFFQSxHQUFNdkIsRUFBWXlFLEVBQVN2QixHQUNuQzBCLEVBQUssTUFBTU4sRUFBR0ksZUFBZUosRUFBR0ssVUFDaENFLEVBQU0sTUFBTXBFLEVBQWdCWSxVQUFVWixFQUFnQmEsVUFBVWIsRUFBZ0JjLEtBQ2hGOEMsRUFBUUMsRUFBR0MsT0FBbUJPLGFBQWEsb0JBQzdDNUMsRUFBRzZDLFVBQVksc0JBQXNCSCxvQ0FDUEMsOEJBQ05SIn0=
