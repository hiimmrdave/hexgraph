/**
 * gathers the library together into a working demo
 * reveals weaknesses in usability and design
 * provides interface for visual testing
 * ! this whole file is spaghetti.
 */
import { buildCanvas, renderCanvasFrame, renderSvg } from "./renderer.js";
import {
  LayoutConfig,
  configureLayout,
  rotateTransform,
  shearTransform,
  scaleTransform,
  pointToCube,
  XYVector,
} from "./layout.js";
import { GridMap, GridShape, makeGrid } from "./grid.js";
import * as Subset from "./subset.js";
import * as Hex from "./hex.js";
import {
  getFloatValue,
  getIntValue,
  getRadioValue,
  getStringValue,
} from "./utils.js";
import { thousandthRound } from "./math.js";

const svgGridTarget = "svghg",
  canvasGridTarget = "canvhg",
  shapes = ["line", "ring", "hexagon", "cone", "rhombbus"],
  shapesHolder = "shapes",
  shapeLayoutConfig: LayoutConfig = configureLayout(
    { x: 45, y: 45 },
    { x: 90, y: 90 },
    [scaleTransform(5, 5)]
  ),
  shapeGrid: GridMap = makeGrid({ size: 5 }),
  source = Hex.makeNode({ q: 1, r: -1, s: 0 }, "Cell") as Hex.CellNode,
  toward = { q: -2, r: 4, s: -2 },
  subsets = [
    Subset.line({ source, toward }),
    Subset.ring({ source, size: 3 }),
    Subset.hexagon({ source, size: 3 }),
    Subset.cone({ source, toward, size: 4 }),
    Subset.rhombus({ source, toward, size: 3 }),
  ],
  svgRenderContext = document.getElementById(svgGridTarget) as HTMLDivElement,
  st = document.getElementById("st") as HTMLParagraphElement;
export const inputs = document.querySelector(
    'form[id="params"]'
  ) as HTMLFormElement,
  getForm = (): [LayoutConfig, GridMap] => {
    return [
      configureLayout(
        { x: getIntValue("orx"), y: getIntValue("ory") },
        { x: getIntValue("csx"), y: getIntValue("csy") },
        [
          rotateTransform((getFloatValue("orientation") * Math.PI) / 12),
          shearTransform(getFloatValue("shx"), getFloatValue("shy")),
          scaleTransform(getIntValue("hsx"), getIntValue("hsy")),
        ]
      ),
      makeGrid({
        shape: getRadioValue("shape") as GridShape,
        size: [getIntValue("gs1"), getIntValue("gs2")],
        populate: true,
      }),
    ];
  },
  rendSvg = (): void => {
    const config = getForm(),
      holder = document.getElementById(shapesHolder) as HTMLDivElement;
    let last;
    holder.style.width = `${getStringValue("csx")}px`;
    while ((last = svgRenderContext.lastChild)) {
      svgRenderContext.removeChild(last);
    }
    renderSvg(svgGridTarget, ...config);
  },
  makeCanv = (): CanvasRenderingContext2D => {
    const [layout, grid] = getForm(),
      canvas = buildCanvas(canvasGridTarget, layout),
      ctx = canvas.getContext("2d") as CanvasRenderingContext2D,
      canvasHolder = document.getElementById(
        canvasGridTarget
      ) as HTMLDivElement;
    canvasHolder.appendChild(canvas);
    renderCanvasFrame(ctx, layout, grid);
    return ctx;
  },
  rendCanv = (ctx: CanvasRenderingContext2D): void => {
    renderCanvasFrame(ctx, ...getForm());
  };

/**/
let ctx: CanvasRenderingContext2D;
document.addEventListener("DOMContentLoaded", () => {
  rendSvg();
  ctx = makeCanv();
  rendCanv(ctx);
  const holder = document.getElementById(shapesHolder) as HTMLDivElement;
  shapes.forEach((shape, index) => {
    const shapeContainer = document.createElement("div") as HTMLDivElement,
      subset = subsets[index];
    shapeContainer.id = shape;
    shapeContainer.style.display = "inline-block";
    holder.appendChild(shapeContainer);
    renderSvg(shape, shapeLayoutConfig, shapeGrid);
    const sourceHex = shapeContainer.querySelector(
      `[data-hex-node-id="${source.id}"]`
    ) as SVGPathElement;
    sourceHex.classList.add("source");
    subset.forEach((e): void => {
      const cell = document.querySelector(
        `#${shape} [data-hex-node-id="${e.id}"]`
      ) as SVGPathElement;
      if (cell) {
        cell.classList.add("hilit");
      }
    });
  });
});

inputs.addEventListener("input", () => {
  rendSvg();
  rendCanv(ctx);
});
svgRenderContext.addEventListener("mouseup", (ev) => {
  if (!(ev.target as Element).matches(".cell")) return;
  const [layout] = getForm(),
    clickXY: XYVector = { x: ev.offsetX, y: ev.offsetY },
    { q, r, s } = pointToCube(clickXY, layout),
    xy = `x: ${ev.offsetX}, y: ${ev.offsetY}`,
    ptc = `q: ${thousandthRound(q)}, r: ${thousandthRound(
      r
    )}, s: ${thousandthRound(s)}`,
    cell = (ev.target as Element).getAttribute("data-hex-node-id");
  st.innerText = `click coordinates: ${xy}
  fractional qrs coordinates: ${ptc}
  hex cell coordinates: ${cell}`;
});
