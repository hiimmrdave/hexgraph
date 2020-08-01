import { GridMap, GridShape, XYVector, NodeType } from "./types";
import * as Hex from "./hex";

export function make({
  shape = GridShape.Hexagon,
  size = { x: 3, y: 1 },
  populate = false,
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

function gridPush(
  grid: GridMap,
  q: number,
  r: number,
  s: number = -q - r
): GridMap {
  const cell = Hex.makeNode({ q, r, s }, NodeType.Cell);
  grid.set(cell.id, cell);
  Hex.vertices(cell).forEach(vertex => {
    cell.links.add(vertex);
    vertex.links.add(cell);
    grid.set(vertex.id, vertex);
  });
  Hex.edges(cell).forEach(edge => {
    cell.links.add(edge);
    edge.links.add(cell);
    grid.set(edge.id, edge);
  });
  return grid;
}

function populateHexagonGrid(size: XYVector, grid: GridMap) {
  const cellset = grid;
  for (let ia = -size.x; ia <= size.x; ia++) {
    for (let ib = -size.x; ib <= size.x; ib++) {
      if (Math.abs(ia) + Math.abs(ib) + Math.abs(-ia - ib) < size.x * 2) {
        gridPush(cellset, ia, ib);
      }
    }
  }
  return cellset;
}

function populateTriangleGrid(size: XYVector, grid: GridMap) {
  const cellset = grid;
  for (let ia = 0; ia <= size.x; ia++) {
    for (let ib = 0; ib <= size.x - ia; ib++) {
      gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}

function populateStarGrid(size: XYVector, grid: GridMap) {
  const cellset = grid;
  for (let ia = -size.x; ia <= size.x; ia++) {
    for (let ib = -size.x; ib < size.x; ib++) {
      const ic = -ia - ib;
      gridPush(cellset, ia, ib);
      gridPush(cellset, ic, ib);
      gridPush(cellset, ia, ic, ib);
    }
  }
  return cellset;
}

function populateParallelogramGrid(size: XYVector, grid: GridMap) {
  const cellset = grid;
  for (let ia = 0; ia <= size.x; ia++) {
    for (let ib = 0; ib <= size.y; ib++) {
      gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}

function populateRectangleGrid(size: XYVector, grid: GridMap) {
  const cellset = grid;
  for (let ia = 0; ia <= size.x; ia++) {
    const off = Math.floor(ia / 2);
    for (let ib = -off; ib < size.y - off; ib++) {
      gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}
