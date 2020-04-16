import { HexNode, GridShape, CartesianVector } from "./types";
import * as Cell from "./cell";

export function make({
  shape = GridShape.Hexagon,
  size = { x: 3, y: 1 },
  populate = false,
}: {
  shape?: GridShape;
  size?: CartesianVector;
  populate?: boolean;
} = {}) {
  var grid: Set<HexNode> = new Set();
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
  grid: Set<HexNode>;
  shape: GridShape;
  size: CartesianVector;
  emptyFirst?: boolean;
}): Set<HexNode> {
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

function populateHexagonGrid(size: CartesianVector, grid: Set<HexNode>) {
  var cellset = grid;
  for (let ia = -size.x; ia <= size.x; ia++) {
    for (let ib = -size.x; ib <= size.x; ib++) {
      const ic = -ia - ib;
      if (Math.abs(ia) + Math.abs(ib) + Math.abs(ic) < size.x * 2) {
        cellset.add(Cell.make({ q: ia, r: ib, s: ic }));
      }
    }
  }
  return cellset;
}

function populateTriangleGrid(size: CartesianVector, grid: Set<HexNode>) {
  var cellset = grid;
  for (let ia = 0; ia <= size.x; ia++) {
    for (let ib = 0; ib <= size.x - ia; ib++) {
      cellset.add(Cell.make({ q: ia, r: ib, s: -ia - ib }));
    }
  }
  return cellset;
}

function populateStarGrid(size: CartesianVector, grid: Set<HexNode>) {
  var cellset = grid;
  for (let ia = -size.x; ia <= size.x; ia++) {
    for (let ib = -size.x; ib < this.size; ib++) {
      const ic = -ia - ib;
      cellset.add(Cell.make({ q: ia, r: ib, s: ic }));
      cellset.add(Cell.make({ q: ic, r: ib, s: ia }));
      cellset.add(Cell.make({ q: ia, r: ic, s: ib }));
    }
  }
  return cellset;
}

function populateParallelogramGrid(size: CartesianVector, grid: Set<HexNode>) {
  var cellset = grid;
  for (let ia = 0; ia <= size.x; ia++) {
    for (let ib = 0; ib <= size.y; ib++) {
      cellset.add(Cell.make({ q: ia, r: ib, s: -ia - ib }));
    }
  }
  return cellset;
}

function populateRectangleGrid(size: CartesianVector, grid: Set<HexNode>) {
  var cellset = grid;
  for (let ia = 0; ia <= size.x; ia++) {
    const off = Math.floor(ia/2);
    for (let ib = -off; ib < size.y - off; ib++) {
      cellset.add(Cell.make({ q: ia, r: ib, s: -ia - ib }));
    }
  }
  return cellset;
}
