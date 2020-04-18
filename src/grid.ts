import { HexNode, GridShape, xyVector } from "./types";
import * as Cell from "./cell";

export function make({
  shape = GridShape.Hexagon,
  size = { x: 3, y: 1 },
  populate = false,
}: {
  shape?: GridShape;
  size?: xyVector;
  populate?: boolean;
} = {}) {
  var grid: Map<string, HexNode> = new Map();
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
  grid: Map<string, HexNode>;
  shape: GridShape;
  size: xyVector;
  emptyFirst?: boolean;
}): Map<string, HexNode> {
  const gridPopulator: Array<any> = [
    populateHexagonGrid,
    populateTriangleGrid,
    populateStarGrid,
    populateParallelogramGrid,
    populateRectangleGrid,
  ];
  if (emptyFirst) grid.clear();
  return gridPopulator[shape](size, grid);
}

function gridPush(
  grid: Map<string, HexNode>,
  q: number,
  r: number,
  s: number = -q - r
): Map<string, HexNode> {
  const cell = Cell.make({ q, r, s });
  grid.set(cell.id, cell);
  Cell.vertices(cell).forEach((vertex) => {
    cell.links.add(vertex);
    vertex.links.add(cell);
    grid.set(vertex.id, vertex);
  });
  Cell.edges(cell).forEach((edge) => {
    cell.links.add(edge);
    edge.links.add(cell);
    grid.set(edge.id, edge);
  });
  return grid;
}

function populateHexagonGrid(
  size: xyVector,
  grid: Map<string, HexNode>
) {
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

function populateTriangleGrid(
  size: xyVector,
  grid: Map<string, HexNode>
) {
  var cellset = grid;
  for (let ia = 0; ia <= size.x; ia++) {
    for (let ib = 0; ib <= size.x - ia; ib++) {
      gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}

function populateStarGrid(size: xyVector, grid: Map<string, HexNode>) {
  var cellset = grid;
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

function populateParallelogramGrid(
  size: xyVector,
  grid: Map<string, HexNode>
) {
  var cellset = grid;
  for (let ia = 0; ia <= size.x; ia++) {
    for (let ib = 0; ib <= size.y; ib++) {
      gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}

function populateRectangleGrid(
  size: xyVector,
  grid: Map<string, HexNode>
) {
  var cellset = grid;
  for (let ia = 0; ia <= size.x; ia++) {
    const off = Math.floor(ia / 2);
    for (let ib = -off; ib < size.y - off; ib++) {
      gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}
