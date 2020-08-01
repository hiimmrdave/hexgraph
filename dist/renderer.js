import * as Layout from "./layout";
const SVGNS = "http://www.w3.org/2000/svg";
export function cellPath(cell, layout) {
    return `M${Layout.cellPoints({ cell, layout })
        .map(e => `${e.x},${e.y}`)
        .join(" L")}z`;
}
export function makeSvgElement(elementName) {
    return document.createElementNS(SVGNS, elementName);
}
export function makeSvgRoot({ size }) {
    const svgRoot = makeSvgElement("svg");
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
    return svgRoot;
}
export function buildCell(cell, layout) {
    const path = makeSvgElement("path");
    path.classList.add("cell");
    const c = Layout.cubeToPoint(cell, layout);
    path.style.transformOrigin = `${c.x}px ${c.y}px`;
    path.setAttribute("d", cellPath(cell, layout));
    Object.assign(path.dataset, { q: cell.q, r: cell.r, s: cell.s });
    return path;
}
export function render(targetId, layout, grid) {
    const targetElem = document.getElementById(targetId);
    const svgRoot = makeSvgRoot(layout);
    grid.forEach((node) => {
        if (node.nodetype === "Cell") {
            svgRoot.appendChild(buildCell(node, layout));
        }
    });
    targetElem.appendChild(svgRoot);
}
//# sourceMappingURL=renderer.js.map