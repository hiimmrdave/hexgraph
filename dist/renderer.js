import * as layout from "./layout";
const SVGNS = "http://www.w3.org/2000/svg";
export function makeSvgElement(elementName) {
    return document.createElementNS(SVGNS, elementName);
}
export function cellPath(cell, layoutParams) {
    return ("M" +
        layout
            .cellPoints({ cell, layout: layoutParams })
            .map((e) => `${e.x},${e.y}`)
            .join(" L") +
        "z");
}
export function buildCell(cell, layoutParams) {
    const path = makeSvgElement("path");
    const c = layout.cubeToPoint(cell, layoutParams);
    path.style.transformOrigin = `${c.x}px ${c.y}px`;
    path.setAttribute("d", cellPath(cell, layoutParams));
    return path;
}
//# sourceMappingURL=renderer.js.map