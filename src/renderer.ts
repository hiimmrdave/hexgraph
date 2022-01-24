import { XYVector, LayoutConfig, cellPoints, cubeToPoint } from "./layout.js";
import { CellNode } from "./hex.js";
import { GridMap } from "./grid.js";

const SVGNS = "http://www.w3.org/2000/svg";

/**
 * construct an SVG path describing the borders of a cell
 * @param cell - the hexagon to draw.
 * @param layoutParams - the Layout object describing the world to draw in
 */
function cellPath(cell: CellNode, layout: LayoutConfig): string {
  return `M${cellPoints({ cell, layout })
    .map((e) => `${e.x},${e.y}`)
    .join(" L")}z`;
}

function buildSvgRoot({ size }: LayoutConfig): SVGSVGElement {
  const svgRoot = document.createElementNS(SVGNS, "svg");
  svgRoot.setAttribute("xmlns", SVGNS);
  svgRoot.setAttribute("viewBox", `0 0 ${size.x} ${size.y}`);
  svgRoot.setAttribute("width", size.x.toString(10));
  svgRoot.setAttribute("height", size.y.toString(10));
  Object.assign(svgRoot.style, {
    width: size.x.toString(10),
    height: size.y.toString(10),
    padding: "0",
    margin: "0",
  });
  return svgRoot;
}

function buildSvgCell(cell: CellNode, layout: LayoutConfig): SVGPathElement {
  const path = document.createElementNS(SVGNS, "path"),
    c: XYVector = cubeToPoint(cell, layout);
  path.classList.add("cell");
  path.style.transformOrigin = `${c.x}px ${c.y}px`;
  path.setAttribute("d", cellPath(cell, layout));
  path.dataset.hexNodeId = cell.id;
  Object.assign(path.dataset, { q: cell.q, r: cell.r, s: cell.s });
  return path;
}

export function renderSvg(
  targetId: string,
  layout: LayoutConfig,
  grid: GridMap
): void {
  const targetElem = //TODO: don't lie to the compiler, dave. it's just trying to help you.
      document.getElementById(targetId) ?? document.createElement("div"),
    svgRoot = buildSvgRoot(layout);
  grid.forEach((node): void => {
    if (node.kind === "Cell") {
      svgRoot.appendChild(buildSvgCell(node, layout));
    }
  });
  targetElem.appendChild(svgRoot);
}

export function buildCanvas(
  targetId: string,
  layout: LayoutConfig
): HTMLCanvasElement {
  const targetElem = //TODO: the kind thing would be to return some reference to targetElem
      document.getElementById(targetId) ?? document.createElement("div"),
    canvasRoot = document.createElement("canvas");
  canvasRoot.setAttribute("width", layout.size.x.toString(10));
  canvasRoot.setAttribute("height", layout.size.y.toString(10));
  targetElem.appendChild(canvasRoot);
  return canvasRoot;
}

export function renderCanvasFrame(
  ctx: CanvasRenderingContext2D,
  layout: LayoutConfig,
  grid: GridMap
): void {
  ctx.clearRect(0, 0, layout.size.x, layout.size.y);
  grid.forEach((node) => {
    if (node.kind === "Cell") {
      ctx.stroke(new Path2D(cellPath(node, layout)));
    }
  });
}
