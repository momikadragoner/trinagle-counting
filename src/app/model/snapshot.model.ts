import { Link } from "./link.model";
import { Node } from "./node.model";

export interface Snapshot {
  lineIndex: number,
  usedNodes: Node[],
  usedLinks: Link[],
  variables: any
}
