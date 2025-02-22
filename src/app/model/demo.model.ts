import { Graph } from "./graph.model";
import { Snapshot } from "./snapshot.model";

export interface Demo {
  graph: Graph,
  algoName: String,
  pseudoCode: String,
  snapshotSequence: Snapshot[],
  currentStepIndex: number
}
