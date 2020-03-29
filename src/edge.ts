import { QRS, NodeType, HexNode } from "./types"
import { makeNode } from "./main"

/**
 * 
 * @param q - the `q` coordinate of the node
 * @param r - the `r` coordinate of the node
 * @param s - the `s` coordinate of the node
 * @returns a Edge-type HexNode
 */
export function makeEdge({ q, r, s }: QRS): HexNode {
  return Object.assign(makeNode({ q, r, s }), { nodetype: NodeType.Edge })
}