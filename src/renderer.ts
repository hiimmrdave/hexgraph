// import * as Hex from "./hex";
// import * as Grid from "./grid";
import * as Layout from "./layout.js";
import {
  LayoutConfig,
  CellNode,
  XYVector,
  GridMap,
  NodeType,
} from "./types.js";

const SVGNS = "http://www.w3.org/2000/svg";

/**
 * construct an SVG path describing the borders of a cell
 * @param cell - the hexagon to draw.
 * @param layoutParams - the Layout object describing the world to draw in
 */
export function cellPath(cell: CellNode, layout: LayoutConfig): string {
  return `M${Layout.cellPoints({ cell, layout })
    .map(e => `${e.x},${e.y}`)
    .join(" L")}z`;
}

/**
 * create an SVG element
 * @param elementName - the name of the SVG element to create
 */
export function makeSvgElement(elementName: string): SVGElement {
  return document.createElementNS(SVGNS, elementName) as SVGElement;
}

export function makeSvgRoot({ size }: LayoutConfig): SVGSVGElement {
  const svgRoot = makeSvgElement("svg") as SVGSVGElement;
  svgRoot.setAttribute("xmlns", svgRoot.namespaceURI);
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

export function buildCell(
  cell: CellNode,
  layout: LayoutConfig
): SVGPathElement {
  const path = makeSvgElement("path") as SVGPathElement;
  path.classList.add("cell");
  const c: XYVector = Layout.cubeToPoint(cell, layout);
  path.style.transformOrigin = `${c.x}px ${c.y}px`;
  path.setAttribute("d", cellPath(cell, layout));
  Object.assign(path.dataset, { q: cell.q, r: cell.r, s: cell.s });
  return path;
}

export function render(
  targetId: string,
  layout: LayoutConfig,
  grid: GridMap
): void {
  const targetElem = document.getElementById(targetId);
  const svgRoot = makeSvgRoot(layout);
  grid.forEach((node): void => {
    if (node.kind === NodeType.Cell) {
      svgRoot.appendChild(buildCell(node, layout));
    }
  });
  targetElem.appendChild(svgRoot);
}
