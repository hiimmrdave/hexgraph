import { CubeVector, NodeType } from "./types"
import { makeNode } from "./main"

export function makeVertex({ q, r, s }: CubeVector): CubeVector {
  return Object.assign(makeNode({ q, r, s }), { type: NodeType.Vertex })
}