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
   * the {@link NodeType} of the node
   */
  readonly nodetype?: NodeType;
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

export type QRS = CubeVector | HexNode;

export interface CartesianVector {
  readonly x: number;
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
  Hexagon,
  Triangle,
  Star,
  Parallelogram
}
