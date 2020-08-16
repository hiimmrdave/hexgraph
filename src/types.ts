/**
 * a vector or coordinate in qrs space
 * qrs is cubic space, which is confined here to a plane q+r+s==0
 */
export interface QRSVector {
  /** q component of vector */
  readonly q: number;
  /** r component of vector */
  readonly r: number;
  /** s component of vector */
  readonly s: number;
  /** the cube coordinates of the node as a comma-separated string */
  readonly id?: string;
  /** the set of nodes adjacent to this node. "Adjacency" is arbitrary. */
  links?: WeakSet<HexNode>;
  /** arbitrary additional properties */
  [prop: string]: unknown;
}

/** a Cell node of the hexagonal grid */
export interface CellNode extends QRSVector {
  /** the discriminant of the HexNode */
  kind: "Cell";
}

/** an Edge node of the hexagonal grid */
export interface EdgeNode extends QRSVector {
  /** the discriminant of the HexNode */
  kind: "Edge";
}

/** a Vertex node of the hexagonal grid */
export interface VertexNode extends QRSVector {
  /** the discriminant of the HexNode */
  kind: "Vertex";
}

/** a node of the graph representation of the hexagonal grid */
export type HexNode = CellNode | EdgeNode | VertexNode;

/** a vector or coordinate in 2-space */
export interface XYVector {
  /** the x component of the vector */
  readonly x: number;
  /** the y component of the coordinate/vector */
  readonly y: number;
}

/** a matrix to convert from QRS to XY space */
export interface Orientation {
  f: { q: XYVector; r: XYVector };
  b: { q: XYVector; r: XYVector };
}

/**
 * a set of values to convert from CubeVector grid coordinates to
 * CartesianVector screen coodrinates
 */
export interface LayoutConfig {
  orientation: Orientation;
  radius: XYVector;
  origin: XYVector;
  size: XYVector;
}

export type GridMap = Map<string, HexNode>;

/**
 * the type of node of the hex graph,
 * corresponding to which portion of the hex grid the node represents
 */
export type NodeType = "Cell" | "Edge" | "Vertex";

/**
 * the shape of the hexagon grid, which determines the grid generator function
 */
export type GridShape =
  | "Hexagon"
  | "Triangle"
  | "Star"
  | "Parallelogram"
  | "Rectangle";
