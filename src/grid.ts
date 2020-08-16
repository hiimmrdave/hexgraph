import { GridMap, GridShape, XYVector } from "./types.js";
import * as Hex from "./hex.js";

/**
 * Creates a GridMap and (optionally) adds the nodes
 * @param shape determines which grid populator function is used build the grid
 * @param size determines how many cells are in the grid
 * passed as parameter to populator, see details there
 * @param populate determines whether to run the grid populator or return an
 * empty grid
 */
export function make({
  shape = "Hexagon",
  size = { x: 3, y: 1 } as XYVector,
  populate = true,
}: {
  shape?: GridShape;
  size?: XYVector;
  populate?: boolean;
} = {}): GridMap {
  let grid: GridMap = new Map();
  if (populate) {
    grid = populateGrid({ grid, shape, size });
  }
  return grid;
}

function populateGrid({
  grid,
  shape,
  size,
  emptyFirst = false,
}: {
  grid: GridMap;
  shape: GridShape;
  size: XYVector;
  emptyFirst?: boolean;
}): GridMap {
  const gridPopulator: {
    [prop: string]: (size: XYVector, grid: GridMap) => GridMap;
  } = {
    Hexagon: populateHexagonGrid,
    Triangle: populateTriangleGrid,
    Star: populateStarGrid,
    Parallelogram: populateParallelogramGrid,
    Rectangle: populateRectangleGrid,
  };
  if (emptyFirst) grid.clear();
  return gridPopulator[shape](size, grid);
}

/**
 * Add a cell to a grid, generate and link the corresponding nodes
 * @param grid grid to which to append cell
 * @param q q coordinate of cell to add
 * @param r r coordinate of cell to add
 * @param s s coordinate of cell to add
 */
function gridPush(
  grid: GridMap,
  q: number,
  r: number,
  s: number = -q - r
): GridMap {
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

function populateHexagonGrid(size: XYVector, grid: GridMap): GridMap {
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

function populateTriangleGrid(size: XYVector, grid: GridMap): GridMap {
  let cellset = new Map(grid);
  for (let ia = 0; ia <= size.x; ia++) {
    for (let ib = 0; ib <= size.x - ia; ib++) {
      cellset = gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}

function populateStarGrid(size: XYVector, grid: GridMap): GridMap {
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

function populateParallelogramGrid(size: XYVector, grid: GridMap): GridMap {
  let cellset = new Map(grid);
  for (let ia = 0; ia <= size.x; ia++) {
    for (let ib = 0; ib <= size.y; ib++) {
      cellset = gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}

function populateRectangleGrid(size: XYVector, grid: GridMap): GridMap {
  let cellset = new Map(grid);
  for (let ia = 0; ia <= size.x; ia++) {
    const off = Math.floor(ia / 2);
    for (let ib = -off; ib < size.y - off; ib++) {
      cellset = gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}
