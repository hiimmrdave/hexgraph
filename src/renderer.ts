import * as math from "./math";
import * as hex from "./hex";
import * as grid from "./grid";
import * as layout from "./layout";
import { Layout, HexNode, XYVector } from "./types";

const SVGNS: string = "http://www.w3.org/2000/svg";

/**
 * construct an SVG path describing the borders of a cell
 * @param cell - the hexagon to draw.
 * @param layoutParams - the Layout object describing the world to draw in
 */
export function cellPath(cell: HexNode, layoutParams: Layout): string {
  return `M${layout
    .cellPoints({ cell, layout: layoutParams })
    .map((e) => `${e.x},${e.y}`)
    .join(" L")}z`;
}

/**
 * create an SVG element
 * @param elementName - the name of the SVG element to create
 */
export function makeSvgElement(elementName: string) {
  return document.createElementNS(SVGNS, elementName) as SVGElement;
}

export function makeSvgRoot(id: string, { size }: Layout): SVGSVGElement {
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
  });
  svgRoot.id = id;
  return svgRoot;
}

export function buildCell(cell: HexNode, layoutParams: Layout): SVGPathElement {
  const path = makeSvgElement("path") as SVGPathElement;
  path.classList.add("cell");
  const c: XYVector = layout.cubeToPoint(cell, layoutParams);
  path.style.transformOrigin = `${c.x}px ${c.y}px`;
  path.setAttribute("d", cellPath(cell, layoutParams));
  Object.assign(path.dataset, { q: cell.q, r: cell.r, s: cell.s });
  return path;
}
