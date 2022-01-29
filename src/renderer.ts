import { XYVector, LayoutConfig, cellPoints, cubeToPoint } from "./layout.js";
import { CellNode, HexNode, NodeType } from "./hex.js";
import { GridMap } from "./grid.js";
import { makeVulgar } from "./utils.js";

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

/** build a HexNode shower here to mark where the points are
 * for now that's just using the same old coordinate system
 * then it will show (about) what the new coordinates would be
 * then I'll bring them in to sync.
 */

type ListColor = "red" | "green" | "blue";

const nodeColors: Record<NodeType, ListColor> = {
  Cell: "red",
  Vertex: "green",
  Edge: "blue",
};

function buildSvgMarker(point: HexNode, layout: LayoutConfig): SVGGElement {
  const spot = cubeToPoint(point, layout),
    group = document.createElementNS(SVGNS, "g");
  group.appendChild(buildSvgDot(spot, point));
  group.appendChild(buildSvgLabel(spot, point));
  group.appendChild(buildSvgBottomText(spot, point));
  return group;
}

function buildSvgDot({ x, y }: XYVector, { q, r, s, id, kind }: HexNode) {
  const dot = document.createElementNS(SVGNS, "circle");
  dot.classList.add(kind);
  dot.style.transformOrigin = `${x} ${y}`;
  dot.style.fill = nodeColors[kind];
  dot.setAttribute("cx", `${x}`);
  dot.setAttribute("cy", `${y}`);
  dot.setAttribute("r", "2");
  Object.assign(dot.dataset, { q, r, s, id });
  return dot;
}

function buildSvgLabel({ x, y }: XYVector, { q, r, s, kind }: HexNode) {
  const label = document.createElementNS(SVGNS, "text");
  label.textContent = `${q * 6}, ${r * 6}, ${s * 6}`;
  label.style.fill = nodeColors[kind];
  label.setAttribute("x", `${x}`);
  label.setAttribute("y", `${y - 5}`);
  label.setAttribute("text-anchor", "middle");
  return label;
}

function buildSvgBottomText({ x, y }: XYVector, { q, r, s, kind }: HexNode) {
  const label = document.createElementNS(SVGNS, "text");
  label.textContent = `${makeVulgar(q)}, ${makeVulgar(r)}, ${makeVulgar(s)}`;
  label.style.fill = nodeColors[kind];
  label.setAttribute("x", `${x}`);
  label.setAttribute("y", `${y + 15}`);
  label.setAttribute("text-anchor", "middle");
  label.setAttribute("alignment-baseline", "top");
  return label;
}

function buildSvgCell(cell: CellNode, layout: LayoutConfig) {
  const path = document.createElementNS(SVGNS, "path"),
    c: XYVector = cubeToPoint(cell, layout);
  path.classList.add("cell");
  path.style.transformOrigin = `${c.x}px ${c.y}px`;
  path.setAttribute("d", cellPath(cell, layout));
  path.dataset.hexNodeId = cell.id;
  Object.assign(path.dataset, { q: cell.q, r: cell.r, s: cell.s });
  return path;
}

export function renderSvg(targetId: string, layout: LayoutConfig, grid: GridMap): void {
  //TODO: don't lie to the compiler, dave. it's just trying to help you.
  const targetElem = document.getElementById(targetId) ?? document.createElement("div"),
    svgRoot = buildSvgRoot(layout);
  grid.forEach((node): void => {
    if (node.kind === "Cell") {
      svgRoot.appendChild(buildSvgCell(node, layout));
    }
  });
  grid.forEach((node): void => {
    svgRoot.appendChild(buildSvgMarker(node, layout));
  });
  targetElem.appendChild(svgRoot);
}

export function buildCanvas(targetId: string, layout: LayoutConfig): HTMLCanvasElement {
  //TODO: the kind thing would be to return some reference to targetElem
  const targetElem = document.getElementById(targetId) ?? document.createElement("div"),
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
