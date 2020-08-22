// import * as Hex from "./hex";
// import * as Grid from "./grid";
import * as Layout from "./layout.js";
import { LayoutConfig, CellNode, XYVector, GridMap } from "./types.js";

const SVGNS = "http://www.w3.org/2000/svg";

/**
 * construct an SVG path describing the borders of a cell
 * @param cell - the hexagon to draw.
 * @param layoutParams - the Layout object describing the world to draw in
 */
function cellPath(cell: CellNode, layout: LayoutConfig): string {
  return `M${Layout.cellPoints({ cell, layout })
    .map(e => `${e.x},${e.y}`)
    .join(" L")}z`;
}

function makeSvgRoot({ size }: LayoutConfig): SVGSVGElement {
  const svgRoot = document.createElementNS(SVGNS, "svg") as SVGSVGElement;
  svgRoot.setAttribute("xmlns", SVGNS);
  svgRoot.setAttribute("viewBox", `0 0 ${size.x} ${size.y}`);
  svgRoot.setAttribute("width", size.x.toString(10));
  svgRoot.setAttribute("height", size.y.toString(10));
  Object.assign(svgRoot.style, {
    width: size.x.toString(10),
    height: size.y.toString(10),
    padding: "0",
    margin: "0",
    border: "1px solid green",
  });
  return svgRoot;
}

function buildCell(cell: CellNode, layout: LayoutConfig): SVGPathElement {
  const path = document.createElementNS(SVGNS, "path") as SVGPathElement,
    c: XYVector = Layout.cubeToPoint(cell, layout);
  path.classList.add("cell");
  path.style.transformOrigin = `${c.x}px ${c.y}px`;
  path.setAttribute("d", cellPath(cell, layout));
  path.setAttribute("title", cell.id);
  Object.assign(path.dataset, { q: cell.q, r: cell.r, s: cell.s });
  return path;
}

export function render(
  targetId: string,
  layout: LayoutConfig,
  grid: GridMap
): void {
  const targetElem = document.getElementById(targetId) as HTMLElement;
  const svgRoot = makeSvgRoot(layout);
  grid.forEach((node): void => {
    if (node.kind === "Cell") {
      svgRoot.appendChild(buildCell(node, layout));
    }
  });
  targetElem.appendChild(svgRoot);
}
