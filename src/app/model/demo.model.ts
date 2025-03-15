import { AlgoType } from "./algo-type.model";
import { Graph } from "./graph.model";
import { Snapshot } from "./snapshot.model";

export interface Demo {
  graph: Graph,
  algoName: String,
  algoType: AlgoType,
  pseudoCode: String,
  snapshotSequence: Snapshot[]
}
