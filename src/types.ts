/**
 * a vector or coordinate in qrs space
 * qrs is cubic space, which is confined here to a plane q+r+s==0
 */
export interface CubeVector {
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
}

export interface HexNode extends CubeVector {
  /**
   * the NodeType of the node
   */
  readonly nodetype: NodeType;
  /**
   * the cube coordinates of the node as a comma-separated string
   */
  readonly id: string;
  /**
   * the set of nodes adjacent to this node. Adjacency is arbitrary.
   */
  readonly links: WeakSet<HexNode>;
  /**
   * arbitrary additional properties
   */
  [prop: string]: any;
}

/**
 * a vector or coordinate in 2-space
 */
export interface CartesianVector {
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
 * the type of node of the hex graph, corresponding to which portion of the hex grid the node represents
 */
export const enum NodeType {
  /**
   * the node is a cell, a hexagonal space
   */
  Cell,
  /**
   * the node is an edge, a boundary between two cells
   */
  Edge,
  /**
   * the node is a vertex, a point at which three cells and three edges meet
   */
  Vertex
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
   * a grid shape like a diamond or slanted rectangle, takes up to two size values
   */
  Parallelogram,
  /**
   * a grid shape like a rectangle, takes up to two size values
   */
  Rectangle
}
