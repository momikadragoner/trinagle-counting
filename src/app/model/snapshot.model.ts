import { Link } from "./link.model";
import { Node } from "./node.model";

export interface Snapshot {
  lineIndex: Number,
  usedNodes: Node[],
  usedLinks: Link[],
}
