import * as math from "./math";
import * as hex from "./hex";
import * as grid from "./grid";
import * as layout from "./layout";
import { Layout, HexNode, qrsVector, xyVector } from "./types";

const SVGNS: string = "http://www.w3.org/2000/svg";

export function makeSvgElement(elementName: string) {
  return document.createElementNS(SVGNS, elementName) as SVGElement;
}

/**
 *
 * @param cell - the hexagon to draw
 * @param layoutParams - the Layout object describing the world to draw in
 */
export function cellPath(cell: HexNode, layoutParams: Layout): string {
  return (
    "M" +
    layout
      .cellPoints({ cell, layout: layoutParams })
      .map((e) => `${e.x},${e.y}`)
      .join(" L") +
    "z"
  );
}

export function buildCell(cell: HexNode, layoutParams: Layout): SVGElement {
  const path = makeSvgElement("path");
  const c: xyVector = layout.cubeToPoint(cell, layoutParams);
  path.style.transformOrigin = `${c.x}px ${c.y}px`;
  path.setAttribute("d",cellPath(cell,layoutParams));
  return path;
}
