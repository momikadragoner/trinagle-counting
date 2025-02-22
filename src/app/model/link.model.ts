import { Node } from "./node.model";

export interface Link extends d3.SimulationLinkDatum<d3.SimulationNodeDatum> {
  source: Node;
  target: Node;
}
