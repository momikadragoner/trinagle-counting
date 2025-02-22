import { Link } from "./link.model";
import { Node } from "./node.model";

export interface Graph {
  nodes: Node[],
  links: Link[]
}
