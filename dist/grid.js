import * as Cell from "./cell";
export function make({ shape = 0, size = { x: 3, y: 1 }, populate = false, } = {}) {
    var grid = new Map();
    if (populate) {
        grid = populateGrid({ grid, shape, size });
    }
    return grid;
}
function populateGrid({ grid, shape, size, emptyFirst = false, }) {
    const gridPopulator = [
        populateHexagonGrid,
        populateTriangleGrid,
        populateStarGrid,
        populateParallelogramGrid,
        populateRectangleGrid,
    ];
    if (emptyFirst)
        grid.clear();
    return gridPopulator[shape](size, grid);
}
function gridPush(grid, q, r, s = -q - r) {
    const cell = Cell.make({ q, r, s });
    grid.set(cell.id, cell);
    Cell.vertices(cell).forEach((vertex) => {
        grid.set(vertex.id, vertex);
    });
    Cell.edges(cell).forEach((edge) => {
        grid.set(edge.id, edge);
    });
    return grid;
}
function populateHexagonGrid(size, grid) {
    var cellset = grid;
    for (let ia = -size.x; ia <= size.x; ia++) {
        for (let ib = -size.x; ib <= size.x; ib++) {
            if (Math.abs(ia) + Math.abs(ib) + Math.abs(-ia - ib) < size.x * 2) {
                gridPush(cellset, ia, ib);
            }
        }
    }
    return cellset;
}
function populateTriangleGrid(size, grid) {
    var cellset = grid;
    for (let ia = 0; ia <= size.x; ia++) {
        for (let ib = 0; ib <= size.x - ia; ib++) {
            gridPush(cellset, ia, ib);
        }
    }
    return cellset;
}
function populateStarGrid(size, grid) {
    var cellset = grid;
    for (let ia = -size.x; ia <= size.x; ia++) {
        for (let ib = -size.x; ib < this.size; ib++) {
            const ic = -ia - ib;
            gridPush(cellset, ia, ib, ic);
            gridPush(cellset, ic, ib, ia);
            gridPush(cellset, ia, ic, ib);
        }
    }
    return cellset;
}
function populateParallelogramGrid(size, grid) {
    var cellset = grid;
    for (let ia = 0; ia <= size.x; ia++) {
        for (let ib = 0; ib <= size.y; ib++) {
            gridPush(cellset, ia, ib);
        }
    }
    return cellset;
}
function populateRectangleGrid(size, grid) {
    var cellset = grid;
    for (let ia = 0; ia <= size.x; ia++) {
        const off = Math.floor(ia / 2);
        for (let ib = -off; ib < size.y - off; ib++) {
            gridPush(cellset, ia, ib);
        }
    }
    return cellset;
}
//# sourceMappingURL=grid.js.map