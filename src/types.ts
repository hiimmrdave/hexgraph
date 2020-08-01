/**
 * a vector or coordinate in qrs space
 * qrs is cubic space, which is confined here to a plane q+r+s==0
 */
export interface QRSVector {
  /**
   * q component of vector/coordinate
   */
  readonly q: number;
  /**
   * r component of vector/coordinate
   */
  readonly r: number;
  /**
   * s component of vector/coordinate
   */
  readonly s: number;
  /**
   * the cube coordinates of the node as a comma-separated string
   */
  readonly id?: string;
  /**
   * the set of nodes adjacent to this node. Adjacency is arbitrary.
   */
  links?: WeakSet<HexNode>;
  /**
   * arbitrary additional properties
   */
  [prop: string]: unknown;
}

/**
 * a Cell node of the hexagonal grid
 */
export interface CellNode extends QRSVector {
  /**
   * the NodeType of the node
   */
  nodetype: NodeType.Cell;
}

/**
 * an Edge node of the hexagonal grid
 */
export interface EdgeNode extends QRSVector {
  /**
   * the NodeType of the node
   */
  nodetype: NodeType.Edge;
}

/**
 * a Vertex node of the hexagonal grid
 */
export interface VertexNode extends QRSVector {
  /**
   * the cube coordinates of the node as a comma-separated string
   */
  readonly id: string;
  /**
   * the set of nodes adjacent to this node. Adjacency is arbitrary.
   */
  links: WeakSet<HexNode>;
  /**
   * the NodeType of the node
   */
  nodetype: NodeType.Vertex;
}

/**
 * a node of the graph representation of the hexagonal grid
 */
export type HexNode = CellNode | EdgeNode | VertexNode;

/**
 * a vector or coordinate in 2-space
 */
export interface XYVector {
  /**
   * the x component of the coordinate/vector
   */
  readonly x: number;
  /**
   * the y component of the coordinate/vector
   */
  readonly y: number;
}

/**
 * a matrix to convert from QRS to XY space
 */
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
export const enum NodeType {
  /**
   * the node is a cell, a hexagonal space
   * a cell has 6 adjacent cells, 6 adjacent edges, and 6 adjacent vertices
   */
  Cell = "Cell",
  /**
   * the node is an edge, a boundary between two cells
   * an edge has 2 adjacent cells, 4 adjacent edges, and 2 adjacent vertices
   */
  Edge = "Edge",
  /**
   * the node is a vertex, a point at which three cells and three edges meet
   * a vertex has 3 adjacent cells, 3 adjacent edges, and 3 adjacent vertices
   */
  Vertex = "Vertex",
}

/**
 * the shape of the hexagon grid, which determines the grid generator function
 */
export const enum GridShape {
  /**
   * a hexagonal grid
   */
  Hexagon = "Hexagon",
  /**
   * a triangular grid
   */
  Triangle = "Triangle",
  /**
   * a six-pointed star shaped grid
   */
  Star = "Star",
  /**
   * a grid shape like a diamond or slanted rectangle,
   * takes up to two size values
   */
  Parallelogram = "Parallelogram",
  /**
   * a grid shape like a rectangle,
   * takes up to two size values
   */
  Rectangle = "Rectangle",
}
