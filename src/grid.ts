/**
 * builds underlying grid areas
 */
import { CellNode, HexNode, vertices, edges, makeNode } from "./hex.js";

/**
 * hash HexNode by id = `${q},${r},${s}`
 */
export type GridMap = Map<string, HexNode>;

interface GridPopParams {
  size: [number, number] | number;
  grid?: GridMap;
}
type GridPopulator = (arg0: GridPopParams) => GridMap;

/**
 * the shape of the hexagon grid, which determines the grid generator function
 */
export type GridShape = "Hexagon" | "Triangle" | "Star" | "Parallelogram" | "Rectangle";

export function makeTwoSize(size: number | [number, number]): [number, number] {
  if (typeof size === "number") {
    return [size, size];
  }
  return size;
}

/**
 * Creates a GridMap and (optionally) adds the nodes
 * @param shape determines which grid populator function is used build the grid
 * @param size determines how many cells are in the grid passed as parameter to
 * populator, see details there
 * @param populate determines whether to run the grid populator or return an
 * empty grid
 */
export function makeGrid({
  shape = "Hexagon",
  size = [3, 1],
  populate = true,
}: {
  shape?: GridShape;
  size?: [number, number] | number;
  populate?: boolean;
} = {}): GridMap {
  const gridPopulator: Record<GridShape, GridPopulator> = {
    Hexagon: populateHexagonGrid,
    Triangle: populateTriangleGrid,
    Star: populateStarGrid,
    Parallelogram: populateParallelogramGrid,
    Rectangle: populateRectangleGrid,
  };
  if (populate) {
    return gridPopulator[shape]({ size });
  }
  return new Map();
}

/**
 * Add a cell to a grid, generate and link the corresponding nodes
 * @param grid grid to which to append cell
 * @param q q coordinate of cell to add
 * @param r r coordinate of cell to add
 * @param s s coordinate of cell to add
 */
function gridPush(grid: GridMap = new Map(), q: number, r: number, s: number = -q - r): GridMap {
  const cellset = new Map(grid),
    cell = makeNode({ q, r, s }, "Cell") as CellNode;
  cellset.set(cell.id, cell);
  vertices(cell).forEach((vertex) => {
    cell.links.add(vertex);
    vertex.links.add(cell);
    cellset.set(vertex.id, vertex);
  });
  edges(cell).forEach((edge) => {
    cell.links.add(edge);
    edge.links.add(cell);
    cellset.set(edge.id, edge);
  });
  return cellset;
}

function populateHexagonGrid({ size, grid }: GridPopParams): GridMap {
  const [x] = makeTwoSize(size);
  let cellset = grid ? new Map(grid) : new Map();
  for (let ia = -x; ia <= x; ia++) {
    for (let ib = -x; ib <= x; ib++) {
      if (Math.abs(ia) + Math.abs(ib) + Math.abs(-ia - ib) < x * 2) {
        cellset = gridPush(cellset, ia, ib);
      }
    }
  }
  return cellset;
}

function populateTriangleGrid({ size, grid }: GridPopParams): GridMap {
  const [x] = makeTwoSize(size);
  let cellset = grid ? new Map(grid) : new Map();
  for (let ia = 0; ia < x; ia++) {
    for (let ib = 0; ib < x - ia; ib++) {
      cellset = gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}

function populateStarGrid({ size, grid }: GridPopParams): GridMap {
  const [x] = makeTwoSize(size);
  let cellset = grid ? new Map(grid) : new Map();
  for (let ia = -x + 1; ia < x; ia++) {
    for (let ib = -x + 1; ib < x; ib++) {
      const ic = -ia - ib;
      cellset = gridPush(cellset, ia, ib);
      cellset = gridPush(cellset, ic, ib);
      cellset = gridPush(cellset, ia, ic);
    }
  }
  return cellset;
}

function populateParallelogramGrid({ size, grid }: GridPopParams): GridMap {
  const [x, y] = makeTwoSize(size);
  let cellset = grid ? new Map(grid) : new Map();
  for (let ia = 0; ia < x; ia++) {
    for (let ib = 0; ib < y; ib++) {
      cellset = gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}

function populateRectangleGrid({ size, grid }: GridPopParams): GridMap {
  const [x, y] = makeTwoSize(size);
  let cellset = grid ? new Map(grid) : new Map();
  for (let ia = 0; ia < x; ia++) {
    const off = Math.floor(ia / 2);
    for (let ib = -off; ib < y - off; ib++) {
      cellset = gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}
