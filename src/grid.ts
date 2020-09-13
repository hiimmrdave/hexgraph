/**
 * builds underlying grid areas
 */
import { CellNode, HexNode, vertices, edges, makeNode } from "./hex.js";

/**
 * hash HexNode by id = `${q},${r},${s}`
 */
export type GridMap = Map<string, HexNode>;

export type TwoSize = { a: number; b: number };

interface GridPopParams {
  size: TwoSize | number;
  grid?: GridMap;
}
type GridPopulator = (arg0: GridPopParams) => GridMap;

/**
 * the shape of the hexagon grid, which determines the grid generator function
 */
export type GridShape =
  | "Hexagon"
  | "Triangle"
  | "Star"
  | "Parallelogram"
  | "Rectangle";

/**
 * Creates a GridMap and (optionally) adds the nodes
 * @param shape determines which grid populator function is used build the grid
 * @param size determines how many cells are in the grid passed as parameter to
 * populator, see details there
 * @param populate determines whether to run the grid populator or return an
 * empty grid
 */
export function makeTwoSize(size: number | TwoSize): TwoSize {
  if (typeof size === "number") {
    size = { a: size, b: size };
  }
  return size;
}

export function makeGrid({
  shape = "Hexagon",
  size = { a: 3, b: 1 } as TwoSize,
  populate = true,
}: {
  shape?: GridShape;
  size?: TwoSize | number;
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
function gridPush(
  grid: GridMap = new Map(),
  q: number,
  r: number,
  s: number = -q - r
): GridMap {
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
  size = makeTwoSize(size) as TwoSize;
  let cellset = grid ? new Map(grid) : new Map();
  for (let ia = -size.a; ia <= size.a; ia++) {
    for (let ib = -size.a; ib <= size.a; ib++) {
      if (Math.abs(ia) + Math.abs(ib) + Math.abs(-ia - ib) < size.a * 2) {
        cellset = gridPush(cellset, ia, ib);
      }
    }
  }
  return cellset;
}

function populateTriangleGrid({ size, grid }: GridPopParams): GridMap {
  size = makeTwoSize(size) as TwoSize;
  let cellset = grid ? new Map(grid) : new Map();
  for (let ia = 0; ia < size.a; ia++) {
    for (let ib = 0; ib < size.a - ia; ib++) {
      cellset = gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}

function populateStarGrid({ size, grid }: GridPopParams): GridMap {
  size = makeTwoSize(size) as TwoSize;
  let cellset = grid ? new Map(grid) : new Map();
  for (let ia = -size.a + 1; ia < size.a; ia++) {
    for (let ib = -size.a + 1; ib < size.a; ib++) {
      const ic = -ia - ib;
      cellset = gridPush(cellset, ia, ib);
      cellset = gridPush(cellset, ic, ib);
      cellset = gridPush(cellset, ia, ic);
    }
  }
  return cellset;
}

function populateParallelogramGrid({ size, grid }: GridPopParams): GridMap {
  size = makeTwoSize(size) as TwoSize;
  let cellset = grid ? new Map(grid) : new Map();
  for (let ia = 0; ia < size.a; ia++) {
    for (let ib = 0; ib < size.b; ib++) {
      cellset = gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}

function populateRectangleGrid({ size, grid }: GridPopParams): GridMap {
  size = makeTwoSize(size) as TwoSize;
  let cellset = grid ? new Map(grid) : new Map();
  for (let ia = 0; ia <= size.a; ia++) {
    const off = Math.floor(ia / 2);
    for (let ib = -off; ib < size.b - off; ib++) {
      cellset = gridPush(cellset, ia, ib);
    }
  }
  return cellset;
}
