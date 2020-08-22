import { cellPoints, cubeToPoint } from "./layout.js";
const SVGNS = "http://www.w3.org/2000/svg";
function cellPath(cell, layout) {
    return `M${cellPoints({ cell, layout })
        .map(e => `${e.x},${e.y}`)
        .join(" L")}z`;
}
function makeSvgRoot({ size }) {
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
        border: "1px solid green",
    });
    return svgRoot;
}
function buildCell(cell, layout) {
    const path = document.createElementNS(SVGNS, "path"), c = cubeToPoint(cell, layout);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFLdEQsTUFBTSxLQUFLLEdBQUcsNEJBQTRCLENBQUM7QUFPM0MsU0FBUyxRQUFRLENBQUMsSUFBYyxFQUFFLE1BQW9CO0lBQ3BELE9BQU8sSUFBSSxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7U0FDcEMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUNuQixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQWdCO0lBQ3pDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBa0IsQ0FBQztJQUN4RSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0QsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRCxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtRQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQzFCLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDM0IsT0FBTyxFQUFFLEdBQUc7UUFDWixNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSxpQkFBaUI7S0FDMUIsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLElBQWMsRUFBRSxNQUFvQjtJQUNyRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQW1CLEVBQ3BFLENBQUMsR0FBYSxXQUFXLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakUsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FDcEIsUUFBZ0IsRUFDaEIsTUFBb0IsRUFDcEIsSUFBYTtJQUViLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFnQixDQUFDO0lBQ3BFLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFRLEVBQUU7UUFDMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUN4QixPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsQyxDQUFDIn0=