export interface CubeVector {
  readonly q: number;
  readonly r: number;
  readonly s: number;
  readonly type?: NodeType
  [prop: string]: any;
}

export interface CartesianVector {
  readonly x: number;
  readonly y: number;
}

export const enum NodeType {
  Cell,
  Edge,
  Vertex,
}

export const enum GridShape {
  Hexagon,
  Triangle,
  Star,
  Parallelogram,
}