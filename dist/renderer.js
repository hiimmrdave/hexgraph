import * as Layout from "./layout.js";
const SVGNS = "http://www.w3.org/2000/svg";
function cellPath(cell, layout) {
    return `M${Layout.cellPoints({ cell, layout })
        .map(e => `${e.x},${e.y}`)
        .join(" L")}z`;
}
function makeSvgElement(elementName) {
    return document.createElementNS(SVGNS, elementName);
}
function makeSvgRoot({ size }) {
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
        border: "1px solid green",
    });
    return svgRoot;
}
function buildCell(cell, layout) {
    const path = makeSvgElement("path"), c = Layout.cubeToPoint(cell, layout);
    path.classList.add("cell");
    path.style.transformOrigin = `${c.x}px ${c.y}px`;
    path.setAttribute("d", cellPath(cell, layout));
    path.setAttribute("title", cell.id);
    Object.assign(path.dataset, { q: cell.q, r: cell.r, s: cell.s });
    return path;
}
export function render(targetId, layout, grid) {
    const targetElem = document.getElementById(targetId);
    const svgRoot = makeSvgRoot(layout);
    grid.forEach((node) => {
        if (node.kind === "Cell") {
            svgRoot.appendChild(buildCell(node, layout));
        }
    });
    targetElem.appendChild(svgRoot);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxLQUFLLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFHdEMsTUFBTSxLQUFLLEdBQUcsNEJBQTRCLENBQUM7QUFPM0MsU0FBUyxRQUFRLENBQUMsSUFBYyxFQUFFLE1BQW9CO0lBQ3BELE9BQU8sSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO1NBQzNDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDbkIsQ0FBQztBQU1ELFNBQVMsY0FBYyxDQUFDLFdBQW1CO0lBQ3pDLE9BQU8sUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFlLENBQUM7QUFDcEUsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFnQjtJQUN6QyxNQUFNLE9BQU8sR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFrQixDQUFDO0lBQ3ZELE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwRCxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0QsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRCxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtRQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQzFCLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDM0IsT0FBTyxFQUFFLEdBQUc7UUFDWixNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSxpQkFBaUI7S0FDMUIsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLElBQWMsRUFBRSxNQUFvQjtJQUNyRCxNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFtQixFQUNuRCxDQUFDLEdBQWEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqRSxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUNwQixRQUFnQixFQUNoQixNQUFvQixFQUNwQixJQUFhO0lBRWIsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRCxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBUSxFQUFFO1FBQzFCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDeEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEMsQ0FBQyJ9