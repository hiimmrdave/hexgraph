import { CubeVector, NodeType, HexNode } from "./types"
import { makeNode } from "./main"

/**
 * 
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns a Vertex-type HexNode
 */
export function makeVertex({ q, r, s }: CubeVector): HexNode {
  return Object.assign(makeNode({ q, r, s }), { nodetype: NodeType.Vertex })
}