import * as Hex from "./hex.js";
export function make({
  shape = "Hexagon",
  size = { x: 3, y: 1 },
  populate = true,
} = {}) {
  let grid = new Map();
  if (populate) {
    grid = populateGrid({ grid, shape, size });
  }
  return grid;
}
function populateGrid({ grid, shape, size, emptyFirst = false }) {
  const gridPopulator = {
    Hexagon: populateHexagonGrid,
    Triangle: populateTriangleGrid,
    Star: populateStarGrid,
    Parallelogram: populateParallelogramGrid,
    Rectangle: populateRectangleGrid,
  };
  if (emptyFirst) grid.clear();
  return gridPopulator[shape](size, grid);
}
function gridPush(grid, q, r, s = -q - r) {
  const cellset = new Map(grid),
    cell = Hex.makeNode({ q, r, s }, "Cell");
  cellset.set(cell.id, cell);
  Hex.vertices(cell).forEach(vertex => {
    cell.links.add(vertex);
    vertex.links.add(cell);
    cellset.set(vertex.id, vertex);
  });
  Hex.edges(cell).forEach(edge => {
    cell.links.add(edge);
    edge.links.add(cell);
    cellset.set(edge.id, edge);
  });
  return cellset;
}
function populateHexagonGrid(size, grid) {
  let cellset = new Map(grid);
  for (let ia = -size.x; ia <= size.x; ia++) {
    for (let ib = -size.x; ib <= size.x; ib++) {
      if (Math.abs(ia) + Math.abs(ib) + Math.abs(-ia - ib) < size.x * 2) {
        cellset = gridPush(cellset, ia, ib);
      }
    }
  }
  return cellset;
}
function populateTriangleGrid(size, grid) {
  let cellset = new Map(grid);
  for (let ia = 0; ia <= size.x; ia++) {
    for (let ib = 0; ib <= size.x - ia; ib++) {
      cellset = gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}
function populateStarGrid(size, grid) {
  let cellset = new Map(grid);
  for (let ia = -size.x; ia <= size.x; ia++) {
    for (let ib = -size.x; ib <= size.x; ib++) {
      const ic = -ia - ib;
      cellset = gridPush(cellset, ia, ib);
      cellset = gridPush(cellset, ic, ib);
      cellset = gridPush(cellset, ia, ic, ib);
    }
  }
  return cellset;
}
function populateParallelogramGrid(size, grid) {
  let cellset = new Map(grid);
  for (let ia = 0; ia <= size.x; ia++) {
    for (let ib = 0; ib <= size.y; ib++) {
      cellset = gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}
function populateRectangleGrid(size, grid) {
  let cellset = new Map(grid);
  for (let ia = 0; ia <= size.x; ia++) {
    const off = Math.floor(ia / 2);
    for (let ib = -off; ib < size.y - off; ib++) {
      cellset = gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}
//# sourceMappingURL=grid.js.map
