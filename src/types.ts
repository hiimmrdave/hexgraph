/**
 * a vector or coordinate in qrs space
 * qrs is cubic space, which is confined here to a plane q+r+s==0
 */
export interface qrsVector {
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
   * arbitrary additional properties
   */
  [prop: string]: any;
}

/**
 * a node of the graph representation of the hexagonal grid
 */
export interface HexNode extends qrsVector {
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
  nodetype?: NodeType;
}

/**
 * a vector or coordinate in 2-space
 */
export interface xyVector {
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
 * a set of values to convert from CubeVector grid coordinates to
 * CartesianVector screen coodrinates
 */
export interface Layout {
  orientation: {
    f: { q: xyVector; r: xyVector };
    b: { q: xyVector; r: xyVector };
  };
  radius: xyVector;
  origin: xyVector;
  size: xyVector;
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
  Cell,
  /**
   * the node is an edge, a boundary between two cells
   * an edge has 2 adjacent cells, 4 adjacent edges, and 2 adjacent vertices
   */
  Edge,
  /**
   * the node is a vertex, a point at which three cells and three edges meet
   * a vertex has 3 adjacent cells, 3 adjacent edges, and 3 adjacent vertices
   */
  Vertex,
}

/**
 * the shape of the hexagon grid, which determines the grid generator function
 */
export const enum GridShape {
  /**
   * a hexagonal grid
   */
  Hexagon,
  /**
   * a triangular grid
   */
  Triangle,
  /**
   * a six-pointed star shaped grid
   */
  Star,
  /**
   * a grid shape like a diamond or slanted rectangle,
   * takes up to two size values
   */
  Parallelogram,
  /**
   * a grid shape like a rectangle,
   * takes up to two size values
   */
  Rectangle,
}
